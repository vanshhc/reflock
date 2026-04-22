import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CreatorPage } from "@/components/creator/CreatorPage";
import { getStores } from "@/lib/sheets";

export const revalidate = 30;

export async function generateStaticParams() {
  const stores = await getStores();
  return stores.map((s) => ({ handle: s.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const stores = await getStores();
  const store = stores.find((s) => s.handle === handle);
  if (!store) return { title: "Not found" };

  const title = `${store.businessName} — ${store.role}`;
  const description =
    store.bio.length > 155 ? `${store.bio.slice(0, 152).trimEnd()}…` : store.bio;
  const canonical = `/${store.handle}`;
  const twitterHandle = store.socials?.twitter?.replace(/^@/, "");

  return {
    title,
    description,
    keywords: [...store.topics, store.cat],
    alternates: { canonical },
    openGraph: {
      type: "profile",
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
      ...(twitterHandle ? { site: `@${twitterHandle}` } : {}),
    },
  };
}

export default async function StorefrontPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const stores = await getStores();
  const store = stores.find((s) => s.handle === handle);
  if (!store) notFound();

  return (
    <>
      <Nav />
      <CreatorPage store={store} />
      <Footer />
    </>
  );
}
