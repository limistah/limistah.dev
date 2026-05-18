package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"
)

const LinksFile = "content/links.md"

type Category struct {
	Name         string `json:"name"`
	Slug         string `json:"slug"`
	DisplayOrder int    `json:"display_order"`
}

type Link struct {
	ID          string    `json:"id"`
	URL         string    `json:"url"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	Synced      bool      `json:"synced"`
	Category    Category  `json:"category"`
}

type GetLinksResponse struct {
	Links []Link `json:"links"`
}

type MarkSyncedRequest struct {
	LinkIds []string `json:"linkIds"`
}

type MarkSyncedResponse struct {
	Success bool     `json:"success"`
	Updated int      `json:"updated"`
	IDs     []string `json:"ids"`
}

func main() {
	supabaseURL := os.Getenv("SUPABASE_URL")
	apiToken := os.Getenv("LINKSYNC_API_TOKEN")

	if supabaseURL == "" {
		apiToken = os.Getenv("SUPABASE_SERVICE_ROLE_KEY")
	}

	if supabaseURL == "" || apiToken == "" {
		fmt.Fprintln(os.Stderr, "Error: Missing required environment variables")
		fmt.Fprintln(os.Stderr, "Required: SUPABASE_URL, LINKSYNC_API_TOKEN (or SUPABASE_SERVICE_ROLE_KEY)")
		os.Exit(1)
	}

	// Fetch unsynced links
	fmt.Println("🔄 Fetching unsynced links from Supabase...")
	links, err := fetchUnsyncedLinks(supabaseURL, apiToken)
	if err != nil {
		fmt.Fprintf(os.Stderr, "❌ Error fetching links: %v\n", err)
		os.Exit(1)
	}

	if len(links) == 0 {
		fmt.Println("✅ No new links to sync")
		return
	}

	// Group by category and display counts
	fmt.Printf("📝 Found %d new link(s) to sync\n", len(links))
	categoryGroups := groupByCategory(links)
	for _, cat := range sortedCategories(categoryGroups) {
		fmt.Printf("  - %s: %d link(s)\n", cat, len(categoryGroups[cat]))
	}

	// Update links.md file
	fmt.Println("\n📄 Updating content/links.md...")
	if err := updateLinksFile(links); err != nil {
		fmt.Fprintf(os.Stderr, "❌ Error updating links file: %v\n", err)
		os.Exit(1)
	}

	// Mark links as synced
	fmt.Println("✅ Marking links as synced in database...")
	linkIDs := make([]string, len(links))
	for i, link := range links {
		linkIDs[i] = link.ID
	}

	if err := markLinksAsSynced(supabaseURL, apiToken, linkIDs); err != nil {
		fmt.Fprintf(os.Stderr, "❌ Error marking links as synced: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\n✨ Successfully synced %d link(s)!\n", len(links))
}

func fetchUnsyncedLinks(supabaseURL, apiToken string) ([]Link, error) {
	url := fmt.Sprintf("%s/functions/v1/get-links?synced=false", supabaseURL)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "Bearer "+apiToken)

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(body))
	}

	var result GetLinksResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	return result.Links, nil
}

func markLinksAsSynced(supabaseURL, apiToken string, linkIDs []string) error {
	url := fmt.Sprintf("%s/functions/v1/mark-synced", supabaseURL)

	reqBody := MarkSyncedRequest{LinkIds: linkIDs}
	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+apiToken)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(body))
	}

	return nil
}

func groupByCategory(links []Link) map[string][]Link {
	groups := make(map[string][]Link)
	for _, link := range links {
		catName := link.Category.Name
		groups[catName] = append(groups[catName], link)
	}
	return groups
}

func sortedCategories(groups map[string][]Link) []string {
	cats := make([]string, 0, len(groups))
	for cat := range groups {
		cats = append(cats, cat)
	}
	sort.Strings(cats)
	return cats
}

func updateLinksFile(newLinks []Link) error {
	// Read existing file
	content, err := os.ReadFile(LinksFile)
	if err != nil {
		return err
	}

	// Parse the file
	frontmatter, sections := parseLinksFile(string(content))

	// Update lastmod in frontmatter
	today := time.Now().Format("2006-01-02")
	for i, line := range frontmatter {
		if strings.HasPrefix(line, "lastmod:") {
			frontmatter[i] = "lastmod: " + today
			break
		}
	}

	// Group new links by category
	linksByCategory := groupByCategory(newLinks)

	// Add new links to existing sections
	for categoryName, links := range linksByCategory {
		if _, exists := sections[categoryName]; !exists {
			sections[categoryName] = []string{}
		}

		existingLinks := sections[categoryName]
		existingURLs := make(map[string]bool)

		// Extract existing URLs
		for _, line := range existingLinks {
			if url := extractURL(line); url != "" {
				existingURLs[url] = true
			}
		}

		// Add new links (skip duplicates)
		for _, link := range links {
			if !existingURLs[link.URL] {
				existingLinks = append(existingLinks, formatLink(link, len(existingLinks)+1))
			}
		}

		sections[categoryName] = existingLinks
	}

	// Renumber all links in each section
	for categoryName, links := range sections {
		renumbered := make([]string, len(links))
		for i, line := range links {
			renumbered[i] = renumberLink(line, i+1)
		}
		sections[categoryName] = renumbered
	}

	// Rebuild file content
	output := strings.Join(frontmatter, "\n") + "\n\n"

	// Get all categories from sections
	allCats := make([]string, 0, len(sections))
	for cat := range sections {
		allCats = append(allCats, cat)
	}
	sort.Strings(allCats)

	for i, category := range allCats {
		links := sections[category]
		output += fmt.Sprintf("### %s\n\n", category)
		output += strings.Join(links, "\n") + "\n"

		// Add separator except after last category
		if i < len(allCats)-1 {
			output += "\n---\n\n"
		}
	}

	// Write back to file
	return os.WriteFile(LinksFile, []byte(output), 0644)
}

func parseLinksFile(content string) ([]string, map[string][]string) {
	lines := strings.Split(content, "\n")
	frontmatter := []string{}
	sections := make(map[string][]string)

	var currentCategory string
	var currentLinks []string
	inFrontmatter := false
	afterFrontmatter := false

	for _, line := range lines {
		// Handle frontmatter
		if line == "---" {
			if !afterFrontmatter {
				inFrontmatter = !inFrontmatter
				frontmatter = append(frontmatter, line)
				if !inFrontmatter {
					afterFrontmatter = true
				}
				continue
			}
		}

		if inFrontmatter {
			frontmatter = append(frontmatter, line)
			continue
		}

		// Detect category headers (### Category Name)
		if strings.HasPrefix(line, "###") {
			// Save previous category
			if currentCategory != "" {
				sections[currentCategory] = currentLinks
			}
			currentCategory = strings.TrimSpace(strings.TrimPrefix(line, "###"))
			currentLinks = []string{}
			continue
		}

		// Skip horizontal rules
		if strings.TrimSpace(line) == "---" && afterFrontmatter {
			continue
		}

		// Collect links for current category
		if currentCategory != "" && strings.TrimSpace(line) != "" {
			currentLinks = append(currentLinks, line)
		}
	}

	// Save last category
	if currentCategory != "" {
		sections[currentCategory] = currentLinks
	}

	return frontmatter, sections
}

func formatLink(link Link, index int) string {
	desc := ""
	if link.Description != "" {
		desc = " - " + link.Description
	}
	return fmt.Sprintf("%d. [%s](%s)%s", index, link.Title, link.URL, desc)
}

func extractURL(line string) string {
	// Extract URL from markdown link format: [title](url)
	start := strings.Index(line, "](")
	if start == -1 {
		return ""
	}
	end := strings.Index(line[start+2:], ")")
	if end == -1 {
		return ""
	}
	return line[start+2 : start+2+end]
}

func renumberLink(line string, newNum int) string {
	// Remove old number and add new one
	trimmed := strings.TrimSpace(line)
	// Find the first ". " to skip the number
	idx := strings.Index(trimmed, ". ")
	if idx == -1 {
		return line
	}
	return fmt.Sprintf("%d. %s", newNum, trimmed[idx+2:])
}
