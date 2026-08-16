"use client";

import { useEffect, useState } from "react";
import Link from "@/components/InternalLink";
import { usePathname } from "next/navigation";
import { MapPin, Menu, MessageCircle, X } from "lucide-react";
import { LanguageProvider, T, useLanguage } from "./LanguageProvider";
import { whatsappUrl } from "../lib/phones";

const generalPt = "Olá MM, encontrei-vos através do website e gostaria de obter mais informações.";
const generalEn = "Hello MM, I found you through the website and would like more information.";

function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const nav = [
    { href: "/", pt: "Início", en: "Home" },
    { href: "/telefones", pt: "Telefones", en: "Phones" },
    { href: "/reparacao", pt: "Reparação", en: "Repair" },
    { href: "/peliculas", pt: "Películas", en: "Screen protection" },
    { href: "/sobre", pt: "Sobre", en: "About" },
    { href: "/contacto", pt: "Contacto", en: "Contact" },
  ];

  return <header className="siteHeader exactHeader">
    <div className="shopTop"><div className="wide">
      <Link href="/contacto"><MapPin size={13}/><T pt="Estamos localizados na Estrada nº 100, em frente às bombas da Sonangol." en="We are located on Road No. 100, opposite the Sonangol fuel station." /></Link>
      <div><button onClick={() => setLang("pt")} className={lang === "pt" ? "active" : ""}>PT</button><span>|</span><button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>EN</button></div>
    </div></div>
    <div className="wide headerInner">
      <Link className="brand" href="/" aria-label="MM início"><span className="logoFrame"><img src="/logo-mm.png" alt="" /></span><span className="brandName"><b>MM</b><small><T pt="VENDA E REPARAÇÃO DE TELEFONES" en="PHONE SALES AND REPAIR" /></small></span></Link>
      <button className="menuButton" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={lang === "pt" ? "Abrir menu" : "Open menu"}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
      <div className={`navPanel ${open ? "open" : ""}`}>
        <nav>{nav.map((item) => <Link className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "active" : ""} key={item.href} href={item.href} onClick={() => setOpen(false)}>{lang === "pt" ? item.pt : item.en}</Link>)}</nav>
        <a className="headerCta" href={whatsappUrl(lang === "pt" ? generalPt : generalEn)}><MessageCircle size={16}/><T pt="Falar no WhatsApp" en="Chat on WhatsApp" /><span>→</span></a>
      </div>
    </div>
  </header>;
}

function Footer() {
  const { lang } = useLanguage();
  const backToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  return <footer className="siteFooter"><div className="wide footerGrid"><div><button className="brand footerBackToTop" type="button" onClick={backToTop} aria-label={lang === "pt" ? "Voltar ao topo da página" : "Back to the top of the page"} title={lang === "pt" ? "Voltar ao topo" : "Back to top"}><span className="logoFrame"><img src="/logo-mm.png" alt="" /></span><span className="brandName"><b>MM</b><small><T pt="Venda e Reparação de Telefones" en="Phone Sales and Repair" /></small></span></button><p><T pt="Tecnologia, confiança e cuidado mais perto de si." en="Technology, trust and care closer to you." /></p></div><div><b><T pt="Navegação" en="Navigation" /></b><Link href="/"><T pt="Início" en="Home" /></Link><Link href="/telefones"><T pt="Telefones" en="Phones" /></Link><Link href="/reparacao"><T pt="Reparação" en="Repair" /></Link><Link href="/peliculas"><T pt="Películas" en="Screen protection" /></Link><Link href="/sobre"><T pt="Sobre" en="About" /></Link><Link href="/contacto"><T pt="Contacto" en="Contact" /></Link></div><div><b><T pt="Fale com a MM" en="Talk to MM" /></b><a href={whatsappUrl(generalPt)}>WhatsApp · +244 923 933 692</a><a href="https://www.google.com/maps/search/?api=1&query=Estrada+100+Sonangol+Angola" target="_blank" rel="noreferrer"><T pt="Abrir localização" en="Open location" /></a><span><T pt="Estamos localizados na Estrada nº 100, em frente às bombas da Sonangol." en="We are located on Road No. 100, opposite the Sonangol fuel station." /></span></div></div><div className="wide footerBottom"><span>© 2026 MM</span></div></footer>;
}

function ScrollToTop() { const pathname = usePathname(); useEffect(() => { window.scrollTo(0, 0); }, [pathname]); return null; }
export function SiteShell({ children }: { children: React.ReactNode }) { return <LanguageProvider><ScrollToTop/><Header/><main>{children}</main><Footer/></LanguageProvider>; }
