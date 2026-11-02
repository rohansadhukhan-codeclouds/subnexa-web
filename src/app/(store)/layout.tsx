import { SiteFooter } from "@/components/store/site-footer";
import { SiteHeader } from "@/components/store/site-header";

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-950 text-zinc-50">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
