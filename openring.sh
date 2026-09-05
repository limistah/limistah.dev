#!/bin/bash
# Fetches recent posts from the blogs in config/openring/feeds.txt (via openring) and writes
# data/openring.json — deduplicated by canonical URL and by title, newest first.
# Rendered by layouts/partials/openring.html on the home page (10 items).
set -euo pipefail

FEEDLIST=config/openring/feeds.txt
INPUT_TEMPLATE=config/openring/openring_template.html
RAW=$(mktemp)
OUTPUT=data/openring.json
KEEP=${OPENRING_KEEP:-20}

# Unique, non-empty feed URLs (the list has carried duplicates before).
OPENRING_ARGS=()
while IFS= read -r FEED; do
  [ -n "$FEED" ] && OPENRING_ARGS+=(-s "$FEED")
done < <(awk 'NF && !seen[tolower($0)]++' "$FEEDLIST")

# Ask for more than we keep: several feeds syndicate the same posts, and we drop those below.
openring -n 40 "${OPENRING_ARGS[@]}" <"$INPUT_TEMPLATE" >"$RAW"

python3 - "$RAW" "$OUTPUT" "$KEEP" <<'PY'
import json, re, sys
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

raw, out, keep = sys.argv[1], sys.argv[2], int(sys.argv[3])
text = open(raw, encoding="utf-8").read().replace("\\'", "'")   # Go's js-escape uses \' which JSON rejects
items = json.loads(text)

TRACKING = re.compile(r"^(utm_|fbclid|gclid|mc_cid|mc_eid|ref$|source$)")
def canon(url):
    p = urlsplit(url.strip())
    q = [(k, v) for k, v in parse_qsl(p.query, keep_blank_values=True) if not TRACKING.match(k)]
    host = p.netloc.lower().removeprefix("www.")
    path = re.sub(r"/+$", "", p.path) or "/"
    return urlunsplit((p.scheme.lower(), host, path, urlencode(q), ""))
def norm_title(t): return re.sub(r"\W+", " ", t).strip().lower()

seen_urls, seen_titles, clean = set(), set(), []
for it in sorted(items, key=lambda x: x["date"], reverse=True):
    u, t = canon(it["link"]), norm_title(it["title"])
    if not t or u in seen_urls or t in seen_titles:
        continue
    seen_urls.add(u); seen_titles.add(t)
    it["link"] = u
    clean.append(it)
    if len(clean) >= keep: break

json.dump(clean, open(out, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
open(out, "a").write("\n")
print(f"openring: {len(items)} fetched -> {len(clean)} kept")
PY
rm -f "$RAW"
