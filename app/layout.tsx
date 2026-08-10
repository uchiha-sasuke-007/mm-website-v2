import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "../components/SiteShell";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mm-mobile.pages.dev"),
  title: "MM | Smartphones e Reparação em Angola",
  description: "Smartphones seleccionados e serviços de reparação em Bela Vista, Angola.",
  icons: { icon: "/logo-mm.png", shortcut: "/logo-mm.png", apple: "/logo-mm.png" },
  openGraph: {
    title: "MM | Smartphones & Reparação",
    description: "Seu próximo smartphone ou uma nova vida para o atual.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MM Smartphones & Reparação" }],
    locale: "pt_AO",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-AO"><body className={`${geist.variable} ${mono.variable}`}><SiteShell>{children}</SiteShell></body></html>;
}
