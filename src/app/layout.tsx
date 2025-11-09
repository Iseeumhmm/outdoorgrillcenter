import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outdoor Grill Center",
  description: "Your source for outdoor grilling information and reviews",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
