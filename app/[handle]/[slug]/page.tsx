import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OfferingDetail } from "@/components/creator/OfferingDetail";
import { getStores } from "@/lib/sheets";
import { slugify } from "@/lib/slugify";

export const revalidate = 30;

export async function generateStaticParams() {
  const stores = await getStores();
  return stores.flatMap((s) =>
    s.offerings.map((o) => ({ handle: s.handle, slug: slugify(o.name) }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>;
}): Promise<Metadata> {
  const { handle, slug } = await params;
  const stores = await getStores();
  const store = stores.find((s) => s.handle === handle);
  const offering = store?.offerings.find((o) => slugify(o.name) === slug);
  if (!store || !offering) return { title: "Not found" };

  const title = `${offering.name} by ${store.businessName}`;
  const desc =
    offering.desc.length > 155
      ? `${offering.desc.slice(0, 152).trimEnd()}…`
      : offering.desc;
  const canonical = `/${handle}/${slug}`;

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: { type: "website", url: canonical, title, description: desc },
  };
}

export default async function OfferingPage({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>;
}) {
  const { handle, slug } = await params;
  const stores = await getStores();
  const store = stores.find((s) => s.handle === handle);
  if (!store) notFound();

  const offering = store.offerings.find((o) => slugify(o.name) === slug);
  if (!offering) notFound();

  return (
    <>
      <Nav />
      <OfferingDetail store={store} offering={offering} />
      <Footer />
    </>
  );
}
