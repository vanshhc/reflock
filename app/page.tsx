import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { Discover } from "@/components/discover/Discover";
import { CtaStrip } from "@/components/CtaStrip";
import { Footer } from "@/components/Footer";
import { getStores } from "@/lib/sheets";

export const revalidate = 30;

export const metadata: Metadata = {
  title: { absolute: "re. — discover India's best digital products" },
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function DiscoveryPage() {
  const stores = await getStores();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div
          className="h-px max-w-[1200px] mx-auto"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <Discover stores={stores} />
      </main>
      <CtaStrip />
      <Footer />
    </>
  );
}
