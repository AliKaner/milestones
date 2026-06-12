import type { Metadata } from "next";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Shell from "./components/Shell";

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
    <ConvexAuthNextjsServerProvider>
      <html lang="tr">
        <body>
          <ConvexClientProvider>
            <Shell>{children}</Shell>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
