import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/app/StoreProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decentral job | $DCJ",
  description:
    "Ready to ride the crypto wave? Explore endless opportunities in the exciting realm of cryptocurrency careers. Dive into the innovative world of blockchain technology, where your potential knows no bounds. Join us on this thrilling journey and unlock your path to success in the fast-paced world of crypto.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <StoreProvider>
    <html lang="en">
      <head>
        <meta name="siteUrl" content="https://decentraljob.org/" />
        <meta name="og:url" content="https://decentraljob.org/" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Decentral Job | $DCJ" />
        <meta property="og:locale" content="en" />
        <meta property="og:url" content="https://decentraljob.org/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Decentral Job | $DCJ" />
        <meta
          property="og:image"
          content="https://decentraljob.org/seo-cover.png"
        />
        <meta
          property="og:description"
          content="Ready to ride the crypto wave? Explore endless opportunities in the exciting realm of cryptocurrency careers. Dive into the innovative world of blockchain technology, where your potential knows no bounds. Join us on this thrilling journey and unlock your path to success in the fast-paced world of crypto."
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  </StoreProvider>
);

export default RootLayout;
