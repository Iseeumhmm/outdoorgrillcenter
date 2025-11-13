import React from "react";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Outdoor Grill Center",
  description: "Your source for outdoor grilling information and reviews",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
