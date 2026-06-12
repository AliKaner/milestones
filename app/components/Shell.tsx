import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

/** Tüm sayfaları saran global kabuk: üst nav + içerik + footer. */
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
