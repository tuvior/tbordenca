# Blog Authoring Guide

This folder stores local MDX posts. Filenames become slugs (e.g. `my-post.mdx` → `/blog/my-post`).

> Note: `_empty.mdx` is a placeholder so builds succeed when no posts exist. It is marked
> `draft: true` so it won't show up in the blog index. Remove it once you add a real post.

## Frontmatter

```yaml
---
title: "Post title"
description: "Short summary used on the blog index"
date: "2026-01-01"
tags: ["product", "writing"]
cover: "/img/blog/cover.jpg"
related: ["another-post-slug"]
draft: false
---
```

Frontmatter is parsed into an MDX export named `metadata` during build.

## Callouts

```md
:::info
Info callout content.
:::

:::warning
Warning callout content.
:::

:::error
Error callout content.
:::
```

## Spoilers

```md
:::spoiler
Hidden content goes here.
:::
```

## Footnotes

```md
Footnotes can be inline.^[This is an inline footnote.]
```

## Code blocks + line highlights

```md
```ts {1,4-6}
function example() {
  return 'highlighted lines';
}
```
```
