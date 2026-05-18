# GitHub Action Setup - Remaining Steps

## Current Status

✅ **Created GitHub Action workflow** - `.github/workflows/sync-links.yml`  
✅ **Created sync script** - `.github/scripts/sync-links.js` (uses REST API, no dependencies)  
✅ **Configured GitHub secrets structure** - SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  
⚠️ **Need correct Supabase API keys** - Must get service_role key from dashboard

---

## What You Need to Do

### Step 1: Get the Correct Supabase Service Role Key

1. Visit: https://supabase.com/dashboard/project/dwswrvqwricipxnzivrn/settings/api
2. Look for the **"service_role"** secret key (NOT the anon key)
3. Click the eye icon to reveal the key
4. Copy the entire key (it starts with `eyJ...`)

### Step 2: Test the API Key

Before updating GitHub secrets, verify the key works:

```bash
cd /Users/aleemisiaka/Library/Work/portfolio/limistah.dev

# Test the key (paste your actual key)
SUPABASE_SERVICE_ROLE_KEY="<paste-your-service-role-key-here>" node test-api-key.js
```

**Expected output:**
```
🔑 Testing Supabase API key...
Test 1: Fetching categories...
✅ Success! Found 3 categories
Test 2: Fetching links...
✅ Success! Found X total links
   Unsynced: Y
🎉 All tests passed! Your API key is valid.
```

### Step 3: Update GitHub Secret

Once the test passes, update the secret:

```bash
cd /Users/aleemisiaka/Library/Work/portfolio/limistah.dev
gh secret set SUPABASE_SERVICE_ROLE_KEY --body "<paste-your-service-role-key-here>"
```

Verify it's set:
```bash
gh secret list
```

### Step 4: Test the Sync Script Locally

```bash
cd /Users/aleemisiaka/Library/Work/portfolio/limistah.dev

# Set environment variables (use your actual key)
export SUPABASE_URL="https://dwswrvqwricipxnzivrn.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<paste-your-service-role-key-here>"

# Run the script
node .github/scripts/sync-links.js
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

**If no unsynced links:**
```
🔄 Fetching unsynced links from Supabase...
✅ No new links to sync
```

To create a test link, use the Chrome extension to save a link, then run the script again.

### Step 5: Commit and Push

Once the script works locally:

```bash
cd /Users/aleemisiaka/Library/Work/portfolio/limistah.dev
git add .github/ test-api-key.js GITHUB_ACTION_SETUP.md
git commit -m "feat: add GitHub Action to sync links from LinkSync extension"
git push origin dev
```

### Step 6: Test the GitHub Action

**Option A: Manual trigger** (recommended for first test)
```bash
cd /Users/aleemisiaka/Library/Work/portfolio/limistah.dev
gh workflow run sync-links.yml
```

Then watch the run:
```bash
gh run list --workflow=sync-links.yml
gh run watch
```

**Option B: Wait for scheduled run**
- The workflow is scheduled to run daily at 2am UTC
- It will automatically create a PR to the `dev` branch with new links

---

## How the Workflow Works

1. **Triggers**: Daily at 2am UTC, or manually via `workflow_dispatch`
2. **Fetches unsynced links** from Supabase via REST API
3. **Updates content/links.md** with new links, grouped by category
4. **Creates a PR** to `dev` branch with the changes
5. **Auto-merges** the PR to `dev`
6. **Creates a PR** from `dev` to `main`
7. **Auto-merges** to `main`

## Technical Details

### Why Use REST API Instead of supabase-js?

✅ **No dependencies** - Uses native Node.js `fetch` API  
✅ **Faster** - No npm install step in GitHub Actions  
✅ **Simpler** - Direct HTTP requests, easier to debug  
✅ **Consistent** - Same API the Chrome extension uses

### Files Created

- `.github/workflows/sync-links.yml` - GitHub Action workflow
- `.github/scripts/sync-links.js` - Sync script (uses REST API)
- `test-api-key.js` - Helper script to test your API key
- `GITHUB_ACTION_SETUP.md` - This setup guide

### What Gets Synced

- Only links with `synced = false` in the database
- After syncing, links are marked as `synced = true`
- Links are added to the correct category section in links.md
- Existing links are deduplicated by URL
- Links are renumbered automatically

---

## Troubleshooting

### Test script says "Invalid API key"
- Get the correct service_role key from Supabase dashboard
- Make sure you're using the **service_role** key, not the **anon** key
- The key should be ~200+ characters starting with `eyJ`

### Script says "No new links to sync"
- This means all links in the database have `synced = true`
- Save a new link via the Chrome extension to test
- Or manually set some links to `synced = false` in Supabase:
  ```sql
  UPDATE links SET synced = false WHERE id = 'some-id';
  ```

### Workflow fails on GitHub Actions
- Check the logs: `gh run view`
- Verify secrets: `gh secret list`
- Make sure the service_role key is correct

### Links appear duplicated
- The script checks URLs before adding
- If you see duplicates, they have different URLs (maybe http vs https, trailing slash, etc.)

---

## Next Steps After Setup

1. **Save a test link** using the Chrome extension
2. **Manually trigger** the workflow: `gh workflow run sync-links.yml`
3. **Watch it run**: `gh run watch`
4. **Verify** the link appears in content/links.md on your website
5. **Celebrate** 🎉 - Your automated link curation system is live!
