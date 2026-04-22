import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides, strategies, and insights for Indian creators who want to monetize their knowledge — paid communities, cohorts, templates, and more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "Blog · re.",
    description:
      "Guides and insights for Indian creators selling digital products.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16" style={{ background: "var(--color-dark-900)" }}>
        <section className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-8">
          <p className="rf-rise text-sm font-medium text-[var(--color-orange)] mb-3">
            Blog
          </p>
          <h1 className="rf-rise-2 text-3xl md:text-4xl font-bold text-[var(--color-off-white)] font-[family-name:var(--font-display)] leading-tight max-w-2xl">
            Insights for India's creator economy
          </h1>
          <p className="rf-rise-3 mt-4 text-[var(--color-gray-400)] text-base max-w-xl leading-relaxed">
            Practical guides on monetizing your knowledge, building audiences, and selling digital products in India.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <div
                key={post.slug}
                className={i === 0 ? "rf-rise-2" : i === 1 ? "rf-rise-3" : "rf-rise-4"}
              >
                <BlogCard {...post} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
