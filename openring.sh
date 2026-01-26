#!/bin/bash
FEEDLIST=config/openring/feeds.txt
INPUT_TEMPLATE=config/openring/openring_template.html
OUTPUT=layouts/partials/openring.html

# Read the file into an array, one line per element
FEEDS=()
while IFS= read -r line; do
  FEEDS+=("$line")
done <"$FEEDLIST"

# Build an array of arguments for openring
OPENRING_ARGS=()

for FEED in "${FEEDS[@]}"; do
  # Add the source flag and the feed URL from the file to our arguments
  OPENRING_ARGS+=(-s "$FEED")
done

# Execute the command with the assembled arguments
openring -n 5 "${OPENRING_ARGS[@]}" <"$INPUT_TEMPLATE" >"$OUTPUT"

