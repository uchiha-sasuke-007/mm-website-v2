import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mm-mobile.pages.dev"),
  title: "MM Mobile & Repair | Smartphones e Assistência Técnica",
  description: "Smartphones selecionados e reparação especializada com atendimento direto e transparente.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "MM | Smartphones & Reparação",
    description: "Seu próximo smartphone ou uma nova vida para o atual.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MM Smartphones & Reparação" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
