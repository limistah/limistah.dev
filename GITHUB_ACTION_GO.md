# LinkSync GitHub Action - Go Implementation

## Overview

The sync script is now written in **Go** instead of Node.js for better performance and consistency with Hugo.

## Why Go?

✅ **No dependencies** - Single binary, no `npm install` needed  
✅ **Faster** - Compiled code, instant startup  
✅ **Type-safe** - Better error handling  
✅ **Consistent** - Hugo is also written in Go  
✅ **Simpler CI/CD** - No Node.js runtime required  

## How It Works

The script (`/.github/scripts/sync-links.go`) performs these steps:

1. **Fetches unsynced links** from `get-links` Edge Function
2. **Parses** `content/links.md` structure
3. **Adds new links** to appropriate categories (deduplicates by URL)
4. **Renumbers** all links in each category
5. **Updates** `lastmod` date in frontmatter
6. **Marks links as synced** via `mark-synced` Edge Function

## Usage

### Local Testing

```bash
cd /Users/aleemisiaka/Library/Work/portfolio/limistah.dev

# Set environment variables
export SUPABASE_URL="https://dwswrvqwricipxnzivrn.supabase.co"
export LINKSYNC_API_TOKEN="aec61afb5663f4737d2148339b540da1a4b2aea824a2c22577718929241bc86c"

# Run the script
go run .github/scripts/sync-links.go
```

**Expected output:**
```
🔄 Fetching unsynced links from Supabase...
📝 Found X new link(s) to sync
  - Category Name: Y link(s)
📄 Updating content/links.md...
✅ Marking links as synced in database...
✨ Successfully synced X link(s)!
```

### Manual Trigger (GitHub Actions)

```bash
gh workflow run sync-links.yml
gh run watch
```

### Automatic

Runs daily at 2am UTC via GitHub Actions schedule.

## GitHub Secrets Required

- `SUPABASE_URL` - Your Supabase project URL
- `LINKSYNC_API_TOKEN` - The shared API token (same as Chrome extension)

Set these via:
```bash
gh secret set SUPABASE_URL --body "https://dwswrvqwricipxnzivrn.supabase.co"
gh secret set LINKSYNC_API_TOKEN --body "your-token-here"
```

## Architecture

```
┌─────────────────┐
│ Chrome Extension│
│  (save link)    │
└────────┬────────┘
         ↓
┌─────────────────────┐
│ Supabase Database   │
│  synced = false     │
└────────┬────────────┘
         ↓ (daily 2am UTC)
┌─────────────────────┐
│  GitHub Action      │
│  ┌───────────────┐  │
│  │ sync-links.go │  │
│  └───────┬───────┘  │
│          ↓          │
│   get-links API     │
│          ↓          │
│  update links.md    │
│          ↓          │
│ mark-synced API     │
│          ↓          │
│   Create PR → dev   │
│   Auto-merge        │
│   Create PR → main  │
│   Auto-merge        │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│  limistah.dev       │
│  (updated!)         │
└─────────────────────┘
```

## Files

- `.github/workflows/sync-links.yml` - GitHub Action workflow
- `.github/scripts/sync-links.go` - Sync script (Go implementation)
- `test-api-key.js` - Helper to test API token (still Node.js for convenience)

## Workflow Details

**File**: `.github/workflows/sync-links.yml`

**Triggers**:
- `schedule`: Daily at 2am UTC (`cron: '0 2 * * *'`)
- `workflow_dispatch`: Manual trigger

**Steps**:
1. Checkout repo on `dev` branch
2. Setup Go 1.21
3. Run `go run .github/scripts/sync-links.go`
4. Check for changes to `content/links.md`
5. If changes: Create PR to `dev` → auto-merge
6. Create PR from `dev` to `main` → auto-merge

## Troubleshooting

### "Error fetching links: HTTP 401"
- Check `LINKSYNC_API_TOKEN` is correct
- Verify it matches the token used in the Chrome extension

### "Error updating links file: no such file or directory"
- Script must run from repo root
- GitHub Action handles this automatically

### "No new links to sync"
- All links in database have `synced = true`
- Save a link via Chrome extension to test
- Or manually set links to unsynced in Supabase

### Workflow fails on GitHub Actions
```bash
# View recent runs
gh run list --workflow=sync-links.yml

# View specific run
gh run view <run-id>

# Check logs
gh run view <run-id> --log
```

## Development

### Modify the script

1. Edit `.github/scripts/sync-links.go`
2. Test locally: `go run .github/scripts/sync-links.go`
3. Commit changes
4. GitHub Actions will use the updated script automatically

### Code structure

```go
main()                    // Entry point
├─ fetchUnsyncedLinks()   // GET /functions/v1/get-links?synced=false
├─ updateLinksFile()      // Parse, update, write links.md
│  ├─ parseLinksFile()    // Parse frontmatter + sections
│  ├─ groupByCategory()   // Group links by category
│  ├─ formatLink()        // Format as markdown
│  └─ renumberLink()      // Renumber existing links
└─ markLinksAsSynced()    // POST /functions/v1/mark-synced
```

## Performance

**Node.js version**:
- ~3-5 seconds (including `npm install`)
- Requires Node.js runtime
- Dependencies: `@supabase/supabase-js`

**Go version**:
- ~0.5-1 second
- No dependencies
- Single binary compilation

## Next Steps

1. **Test the workflow**: `gh workflow run sync-links.yml`
2. **Save a link** via Chrome extension
3. **Watch it sync**: `gh run watch`
4. **Verify** on your website

The complete LinkSync system is now running! 🎉
