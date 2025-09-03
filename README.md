
---
```markdown
# limistah.dev

Personal blog and portfolio website built with Hugo and the PaperMod theme.

## Features

- Clean and minimalist design using Hugo PaperMod theme
- Markdown-based content writing
- Tags and categories for posts
- Dark mode support
- Fast build and deployment
- Mobile responsive

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/installation/) v0.125.7 or greater
- Git

### Local Development

1. Clone the repository
```bash
git clone https://github.com/limistah/limistah.dev
cd limistah.dev
```

2. Initialize the theme submodule
```bash 
git submodule update --init --recursive
```

3. Start the development server
```bash
hugo server -D
```

The site will be available at http://localhost:1313

## Content Structure

```
content/
├── posts/        # Blog posts
├── about.md      # About page
```

## Creating New Posts

Create new posts in the `content/posts` directory:

```bash
hugo new posts/my-new-post.md
```

Posts should be written in Markdown with front matter:

```yaml
---
title: "Post Title"
date: 2024-01-01
tags: [tag1, tag2]
---
```

## Deployment

The site is automatically built and deployed when changes are pushed to the main branch.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- [Hugo](https://gohugo.io/)
- [PaperMod Theme](https://github.com/adityatelange/hugo-PaperMod)
```
