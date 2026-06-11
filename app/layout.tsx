import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevYol — Junior Developer Yol Haritası",
  description:
    "Sıfırdan bir web sitesi yayınlamak için adım adım, bağlı node'lardan oluşan interaktif yol haritası.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
