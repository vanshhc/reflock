import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";

// We need a temp blog dir to avoid coupling tests to real content
let tmpDir: string;
let blogDir: string;

beforeAll(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "reflock-blog-test-"));
  blogDir = path.join(tmpDir, "content", "blog");
  fs.mkdirSync(blogDir, { recursive: true });

  // Write test MDX files
  fs.writeFileSync(
    path.join(blogDir, "post-a.mdx"),
    `---
title: Post A
description: Desc A
date: "2024-03-15"
slug: post-a
tags: ["tag1"]
---

Body of post A.
`
  );

  fs.writeFileSync(
    path.join(blogDir, "post-b.mdx"),
    `---
title: Post B
description: Desc B
date: "2024-01-01"
slug: post-b
tags: []
---

Body of post B.
`
  );

  fs.writeFileSync(
    path.join(blogDir, "not-mdx.txt"),
    "this should be ignored"
  );

  // Point process.cwd() to tmpDir so lib/blog.ts uses the right BLOG_DIR
  vi.spyOn(process, "cwd").mockReturnValue(tmpDir);
});

afterAll(() => {
  vi.restoreAllMocks();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// Dynamic imports so the mock is in place before the module resolves BLOG_DIR
async function importBlog() {
  // Reset module cache so the mocked cwd() is picked up
  vi.resetModules();
  return import("../lib/blog");
}

describe("getAllPosts", () => {
  it("returns only .mdx files and ignores other extensions", async () => {
    const { getAllPosts } = await importBlog();
    const posts = getAllPosts();
    const slugs = posts.map((p) => p.slug);
    expect(slugs).toContain("post-a");
    expect(slugs).toContain("post-b");
    expect(slugs).not.toContain("not-mdx");
  });

  it("sorts posts newest-first by date", async () => {
    const { getAllPosts } = await importBlog();
    const posts = getAllPosts();
    expect(posts[0].date).toBe("2024-03-15");
    expect(posts[1].date).toBe("2024-01-01");
  });

  it("parses frontmatter fields correctly", async () => {
    const { getAllPosts } = await importBlog();
    const post = getAllPosts().find((p) => p.slug === "post-a");
    expect(post?.title).toBe("Post A");
    expect(post?.description).toBe("Desc A");
    expect(post?.tags).toEqual(["tag1"]);
  });
});

describe("getPost", () => {
  it("returns null for a slug that does not exist", async () => {
    const { getPost } = await importBlog();
    expect(getPost("nonexistent")).toBeNull();
  });

  it("returns the post with content for a valid slug", async () => {
    const { getPost } = await importBlog();
    const post = getPost("post-a");
    expect(post).not.toBeNull();
    expect(post?.title).toBe("Post A");
    expect(post?.content).toContain("Body of post A");
  });

  it("does not include frontmatter in the content string", async () => {
    const { getPost } = await importBlog();
    const post = getPost("post-b");
    expect(post?.content).not.toContain("title:");
    expect(post?.content).toContain("Body of post B");
  });
});
