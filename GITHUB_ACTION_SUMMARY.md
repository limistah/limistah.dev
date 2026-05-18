# GitHub Action Setup - Summary

## What I Built

✅ **GitHub Action Workflow** (`.github/workflows/sync-links.yml`)
- Runs daily at 2am UTC or on manual trigger
- Fetches unsynced links from Supabase
- Updates content/links.md
- Creates PR to dev → auto-merges → creates PR to main → auto-merges

✅ **Sync Script** (`.github/scripts/sync-links.js`)
- Uses native Node.js fetch API (no dependencies!)
- Fetches links via Supabase REST API
- Parses existing links.md structure
- Adds new links to correct categories
- Deduplicates by URL
- Renumbers links automatically
- Marks synced links in database

✅ **Test Script** (`test-api-key.js`)
- Verifies your Supabase API key works
- Tests both categories and links endpoints
- Shows unsynced link count

✅ **Documentation** (`GITHUB_ACTION_SETUP.md`)
- Step-by-step setup instructions
- Troubleshooting guide
- Technical details

---

## Key Improvements You Suggested

**Your idea**: "Why not provide a function to read the categories and links so we use that same way we did with the extension?"

**What I changed**:
1. ❌ **Before**: Used `@supabase/supabase-js` library (extra dependency, npm install required)
2. ✅ **After**: Uses Supabase REST API directly (no dependencies, faster, simpler)

This matches exactly how the Chrome extension works - using the same REST API endpoints!

---

## What You Need to Do Next

### 1. Get Your Supabase Service Role Key

Visit: https://supabase.com/dashboard/project/dwswrvqwricipxnzivrn/settings/api

Copy the **"service_role"** secret key (NOT the anon key)

### 2. Test the API Key

```bash
cd /Users/aleemisiaka/Library/Work/portfolio/limistah.dev
SUPABASE_SERVICE_ROLE_KEY="<your-key>" node test-api-key.js
```

### 3. Update GitHub Secret

```bash
gh secret set SUPABASE_SERVICE_ROLE_KEY --body "<your-key>"
```

### 4. Test Sync Script

```bash
export SUPABASE_URL="https://dwswrvqwricipxnzivrn.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<your-key>"
node .github/scripts/sync-links.js
```

### 5. Commit and Deploy

```bash
git add .github/ test-api-key.js GITHUB_ACTION_SETUP.md
git commit -m "feat: add GitHub Action to sync links from LinkSync extension"
git push origin dev
```

### 6. Trigger the Workflow

```bash
gh workflow run sync-links.yml
gh run watch
```

---

## File Structure

```
limistah.dev/
├── .github/
│   ├── workflows/
│   │   └── sync-links.yml          ← GitHub Action workflow
│   └── scripts/
│       └── sync-links.js            ← Sync script (REST API)
├── content/
│   └── links.md                     ← Gets updated automatically
├── test-api-key.js                  ← Helper to test your key
└── GITHUB_ACTION_SETUP.md           ← Full setup guide
```

---

## How It Works End-to-End

1. **You save a link** via Chrome extension → Supabase database (`synced = false`)
2. **GitHub Action runs** (daily at 2am UTC or manual trigger)
3. **Script fetches** unsynced links via REST API
4. **Script updates** content/links.md with new links
5. **Script marks** links as `synced = true` in database
6. **Workflow creates PR** to dev branch
7. **Workflow auto-merges** to dev
8. **Workflow creates PR** from dev to main
9. **Workflow auto-merges** to main
10. **Your website** rebuilds with the new links!

---

## Benefits of Using REST API

✅ **No dependencies** - Uses native Node.js fetch  
✅ **Faster** - No npm install in CI/CD  
✅ **Simpler** - Direct HTTP requests  
✅ **Consistent** - Same API as Chrome extension  
✅ **Debuggable** - Easy to curl and test  

---

## Ready to Test!

Follow the steps in `GITHUB_ACTION_SETUP.md` to complete the setup.

The only thing blocking you is getting the correct service_role key from the Supabase dashboard.
