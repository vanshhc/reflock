import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getAllPosts, getPost } from "@/lib/blog";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      url: `/blog/${slug}`,
      title: post.title,
      description: post.description,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const formatted = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16" style={{ background: "var(--color-dark-900)" }}>
        <article className="max-w-2xl mx-auto px-6 md:px-8 pt-14 pb-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gray-400)] hover:text-[var(--color-off-white)] transition-colors mb-8"
          >
            ← Blog
          </Link>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--color-orange-tint)] text-[var(--color-orange)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="rf-rise text-2xl md:text-3xl font-bold text-[var(--color-off-white)] font-[family-name:var(--font-display)] leading-snug mb-3">
            {post.title}
          </h1>

          <p className="rf-rise-2 text-sm text-[var(--color-gray-500)] mb-10">{formatted}</p>

          <div className="prose-blog">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
