import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Biodiversity Net Gain App",
  description: "PoC to demonstrate human-in-the-loop digitization of documents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
