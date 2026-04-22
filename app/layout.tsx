import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const SITE_URL = "https://reflock.in";
const SITE_NAME = "re.";
const SITE_DESCRIPTION =
  "The best paid communities, cohorts, templates, and AI tools — built by India's top creators, all in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "re. — discover India's best digital products",
    template: "%s · re.",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "India creators",
    "digital products",
    "paid communities",
    "cohorts",
    "templates",
    "AI tools",
    "online courses",
    "coaching",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: "/",
    title: "re. — discover India's best digital products",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "re. — discover India's best digital products",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${jakarta.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>{children}<Analytics /></body>
    </html>
  );
}
