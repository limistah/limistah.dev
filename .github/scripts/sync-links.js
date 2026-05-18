#!/usr/bin/env node

/**
 * LinkSync - Sync links from Supabase to content/links.md
 * 
 * This script:
 * 1. Fetches unsynced links from LinkSync Edge Functions
 * 2. Groups them by category
 * 3. Updates content/links.md with new links
 * 4. Marks links as synced via Edge Function
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const LINKSYNC_API_TOKEN = process.env.LINKSYNC_API_TOKEN || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !LINKSYNC_API_TOKEN) {
  console.error('Error: Missing required environment variables');
  console.error('Required: SUPABASE_URL, LINKSYNC_API_TOKEN (or SUPABASE_SERVICE_ROLE_KEY)');
  process.exit(1);
}

const LINKS_FILE = join(process.cwd(), 'content/links.md');

/**
 * Fetch unsynced links from LinkSync Edge Function
 */
async function fetchUnsyncedLinks() {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/get-links?synced=false`,
    {
      headers: {
        'Authorization': `Bearer ${LINKSYNC_API_TOKEN}`
      }
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch links: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.links || [];
}

/**
 * Mark links as synced via LinkSync Edge Function
 */
async function markLinksAsSynced(linkIds) {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/mark-synced`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKSYNC_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ linkIds })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to mark links as synced: ${response.status} ${error}`);
  }

  return response.json();
}

/**
 * Parse existing links.md file
 */
function parseLinksFile(content) {
  const lines = content.split('\n');
  const sections = new Map();
  let currentCategory = null;
  let currentLinks = [];
  let frontmatter = [];
  let inFrontmatter = false;
  let afterFrontmatter = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle frontmatter
    if (line === '---') {
      if (!afterFrontmatter) {
        inFrontmatter = !inFrontmatter;
        frontmatter.push(line);
        if (!inFrontmatter) {
          afterFrontmatter = true;
        }
        continue;
      }
    }

    if (inFrontmatter) {
      frontmatter.push(line);
      continue;
    }

    // Detect category headers (### Category Name)
    if (line.startsWith('###')) {
      // Save previous category
      if (currentCategory) {
        sections.set(currentCategory, currentLinks);
      }
      currentCategory = line.replace('###', '').trim();
      currentLinks = [];
      continue;
    }

    // Detect horizontal rule (separator)
    if (line.trim() === '---' && afterFrontmatter) {
      continue;
    }

    // Collect links for current category
    if (currentCategory && line.trim()) {
      currentLinks.push(line);
    }
  }

  // Save last category
  if (currentCategory) {
    sections.set(currentCategory, currentLinks);
  }

  return { frontmatter, sections };
}

/**
 * Format a link in markdown
 */
function formatLink(link, index) {
  const description = link.description ? ` - ${link.description}` : '';
  return `${index}. [${link.title}](${link.url})${description}`;
}

/**
 * Update links.md with new links
 */
function updateLinksFile(newLinks) {
  // Read existing file
  const content = readFileSync(LINKS_FILE, 'utf-8');
  const { frontmatter, sections } = parseLinksFile(content);

  // Update lastmod in frontmatter
  const today = new Date().toISOString().split('T')[0];
  const updatedFrontmatter = frontmatter.map(line => {
    if (line.startsWith('lastmod:')) {
      return `lastmod: ${today}`;
    }
    return line;
  });

  // Group new links by category
  const linksByCategory = new Map();
  for (const link of newLinks) {
    const categoryName = link.category?.name;
    if (!categoryName) continue;

    if (!linksByCategory.has(categoryName)) {
      linksByCategory.set(categoryName, []);
    }
    linksByCategory.get(categoryName).push(link);
  }

  // Add new links to existing sections
  for (const [categoryName, links] of linksByCategory) {
    if (!sections.has(categoryName)) {
      sections.set(categoryName, []);
    }

    const existingLinks = sections.get(categoryName);
    const existingUrls = new Set(
      existingLinks
        .map(line => {
          const match = line.match(/\[.*?\]\((.*?)\)/);
          return match ? match[1] : null;
        })
        .filter(Boolean)
    );

    // Add new links (skip duplicates)
    for (const link of links) {
      if (!existingUrls.has(link.url)) {
        existingLinks.push(formatLink(link, existingLinks.length + 1));
      }
    }

    sections.set(categoryName, existingLinks);
  }

  // Renumber all links in each section
  for (const [categoryName, links] of sections) {
    const renumbered = links.map((line, index) => {
      // Remove old number and add new one
      return line.replace(/^\d+\.\s*/, `${index + 1}. `);
    });
    sections.set(categoryName, renumbered);
  }

  // Rebuild file content
  let output = updatedFrontmatter.join('\n') + '\n\n';

  // Sort categories by display_order (if available) or alphabetically
  const sortedCategories = Array.from(sections.keys()).sort((a, b) => {
    // Try to find display_order from new links
    const orderA = newLinks.find(l => l.category?.name === a)?.category?.display_order ?? 999;
    const orderB = newLinks.find(l => l.category?.name === b)?.category?.display_order ?? 999;
    
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.localeCompare(b);
  });

  for (let i = 0; i < sortedCategories.length; i++) {
    const category = sortedCategories[i];
    const links = sections.get(category);

    output += `### ${category}\n\n`;
    output += links.join('\n') + '\n';
    
    // Add separator except after last category
    if (i < sortedCategories.length - 1) {
      output += '\n---\n\n';
    }
  }

  writeFileSync(LINKS_FILE, output, 'utf-8');
}

/**
 * Main execution
 */
async function main() {
  console.log('🔄 Fetching unsynced links from Supabase...');
  
  const unsyncedLinks = await fetchUnsyncedLinks();
  
  if (unsyncedLinks.length === 0) {
    console.log('✅ No new links to sync');
    return;
  }

  console.log(`📝 Found ${unsyncedLinks.length} new link(s) to sync`);

  // Group by category for logging
  const byCategory = new Map();
  for (const link of unsyncedLinks) {
    const cat = link.category?.name || 'Unknown';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push(link);
  }

  for (const [category, links] of byCategory) {
    console.log(`  - ${category}: ${links.length} link(s)`);
  }

  console.log('\n📄 Updating content/links.md...');
  updateLinksFile(unsyncedLinks);

  console.log('✅ Marking links as synced in database...');
  const linkIds = unsyncedLinks.map(link => link.id);
  await markLinksAsSynced(linkIds);

  console.log(`\n✨ Successfully synced ${unsyncedLinks.length} link(s)!`);
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
