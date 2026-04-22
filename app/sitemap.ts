import type { MetadataRoute } from "next";
import { getStores } from "@/lib/sheets";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 30;

const SITE_URL = "https://reflock.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stores = await getStores();
  const posts = getAllPosts();
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...stores.map((s) => ({
      url: `${SITE_URL}/${s.handle}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
