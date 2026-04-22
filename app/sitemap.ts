import type { MetadataRoute } from "next";
import { getStores } from "@/lib/sheets";

export const revalidate = 30;

const SITE_URL = "https://reflock.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stores = await getStores();
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...stores.map((s) => ({
      url: `${SITE_URL}/${s.handle}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
