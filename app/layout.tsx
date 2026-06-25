import type { Metadata } from "next";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Shell from "./components/Shell";

export const metadata: Metadata = {
  title: {
    default: "Milestones — Yazılım Kariyer Yol Haritası",
    template: "%s · Milestones",
  },
  description:
    "Frontend, Backend, DevOps, Data Engineering ve AI yolları için sıfırdan ileri seviyeye, micro-adımlı interaktif kariyer yol haritası. Gerçek projeler tamamla, kıdem basamaklarını (Intern → Lead) hak ederek tırman ve 450+ terimlik sözlükle öğren.",
  keywords: [
    "yazılım yol haritası",
    "junior developer",
    "frontend",
    "backend",
    "devops",
    "data engineering",
    "yapay zeka",
    "kariyer",
    "kodlama öğren",
  ],
  applicationName: "Milestones",
  openGraph: {
    title: "Milestones — Yazılım Kariyer Yol Haritası",
    description:
      "Frontend'den AI'a 5 kariyer yolu, gerçek projeler ve kıdem basamakları. Adım adım öğren, ilerlemeni kanıtla.",
    siteName: "Milestones",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Milestones — Yazılım Kariyer Yol Haritası",
    description:
      "Frontend'den AI'a 5 kariyer yolu, gerçek projeler ve kıdem basamakları.",
  },
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
