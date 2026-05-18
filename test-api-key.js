#!/usr/bin/env node

/**
 * Test script to verify Supabase API key works
 * 
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY="your-key-here" node test-api-key.js
 */

const SUPABASE_URL = 'https://dwswrvqwricipxnzivrn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  console.error('');
  console.error('Usage:');
  console.error('  SUPABASE_SERVICE_ROLE_KEY="your-key-here" node test-api-key.js');
  console.error('');
  console.error('Get your key from:');
  console.error('  https://supabase.com/dashboard/project/dwswrvqwricipxnzivrn/settings/api');
  process.exit(1);
}

async function testApiKey() {
  console.log('🔑 Testing Supabase API key...');
  console.log(`📍 URL: ${SUPABASE_URL}`);
  console.log(`🔐 Key: ${SUPABASE_SERVICE_ROLE_KEY.substring(0, 20)}...`);
  console.log('');

  try {
    // Test 1: Fetch categories
    console.log('Test 1: Fetching categories...');
    const categoriesResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/categories?select=name,slug&limit=3`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!categoriesResponse.ok) {
      const error = await categoriesResponse.text();
      throw new Error(`Categories fetch failed: ${categoriesResponse.status} ${error}`);
    }

    const categories = await categoriesResponse.json();
    console.log(`✅ Success! Found ${categories.length} categories`);
    console.log('   First 3:', categories.map(c => c.name).join(', '));
    console.log('');

    // Test 2: Fetch links
    console.log('Test 2: Fetching links...');
    const linksResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/links?select=id,title,synced&limit=5`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!linksResponse.ok) {
      const error = await linksResponse.text();
      throw new Error(`Links fetch failed: ${linksResponse.status} ${error}`);
    }

    const links = await linksResponse.json();
    const unsyncedCount = links.filter(l => !l.synced).length;
    console.log(`✅ Success! Found ${links.length} total links`);
    console.log(`   Unsynced: ${unsyncedCount}`);
    console.log(`   Synced: ${links.length - unsyncedCount}`);
    console.log('');

    console.log('🎉 All tests passed! Your API key is valid.');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Update the GitHub secret:');
    console.log('     gh secret set SUPABASE_SERVICE_ROLE_KEY --body "your-key-here"');
    console.log('  2. Test the sync script:');
    console.log('     SUPABASE_URL="..." SUPABASE_SERVICE_ROLE_KEY="..." node .github/scripts/sync-links.js');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('');
    console.error('Make sure you have the correct service_role key from:');
    console.error('  https://supabase.com/dashboard/project/dwswrvqwricipxnzivrn/settings/api');
    process.exit(1);
  }
}

testApiKey();
