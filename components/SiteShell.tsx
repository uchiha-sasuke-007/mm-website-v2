"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageProvider, T, useLanguage } from "./LanguageProvider";
import { whatsappUrl } from "../lib/phones";

function Header(){
  const [open,setOpen]=useState(false); const {lang,setLang}=useLanguage(); const pathname=usePathname();
  const nav=[{href:"/",pt:"Início",en:"Home"},{href:"/telefones",pt:"Telefones",en:"Phones"},{href:"/reparacao",pt:"Reparação",en:"Repair"},{href:"/sobre",pt:"Sobre",en:"About"},{href:"/contacto",pt:"Contacto",en:"Contact"}];
  return <header className="siteHeader"><div className="shopTop"><div className="wide"><span><T pt="MM — Venda e Reparação de Telefones" en="MM — Phone Sales and Repair" /></span><div><Link href="/contacto">⌖ Bela Vista</Link><a href="tel:+244923933692">+244 923 933 692</a></div></div></div><div className="wide headerInner">
    <Link className="brand" href="/" aria-label="MM início"><span className="logoFrame"><img src="/logo-mm.png" alt="" /></span><span className="brandName"><b>MM</b><small><T pt="Venda e Reparação de Telefones" en="Phone Sales and Repair" /></small></span></Link>
    <button className="menuButton" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={lang==="pt"?"Abrir menu":"Open menu"}><i/><i/><i/></button>
    <div className={`navPanel ${open?"open":""}`}>
      <nav>{nav.map(n=><Link className={pathname===n.href||(n.href!=="/"&&pathname.startsWith(n.href))?"active":""} key={n.href} href={n.href} onClick={()=>setOpen(false)}>{lang==="pt"?n.pt:n.en}</Link>)}</nav>
      <Link className="searchHint" href="/telefones" aria-label={lang==="pt"?"Pesquisar telefones":"Search phones"}>⌕</Link>
      <div className="langSwitch" aria-label="Idioma"><button className={lang==="pt"?"active":""} onClick={()=>setLang("pt")}>PT</button><span>|</span><button className={lang==="en"?"active":""} onClick={()=>setLang("en")}>EN</button></div>
      <a className="headerCta" href={whatsappUrl(lang==="pt"?"Olá MM, encontrei-vos através do website e gostaria de obter mais informações.":"Hello MM, I found you through the website and would like more information.")}><T pt="Falar no WhatsApp" en="Chat on WhatsApp" /> <span>↗</span></a>
    </div>
  </div></header>
}

function Footer(){return <footer className="siteFooter"><div className="wide footerGrid"><div><Link className="brand" href="/"><span className="logoFrame"><img src="/logo-mm.png" alt="" /></span><span className="brandName"><b>MM</b><small><T pt="Venda e Reparação de Telefones" en="Phone Sales and Repair" /></small></span></Link><p><T pt="Tecnologia, confiança e cuidado mais perto de si." en="Technology, trust and care closer to you." /></p></div><div><b><T pt="Navegação" en="Navigation" /></b><Link href="/"><T pt="Início" en="Home" /></Link><Link href="/telefones"><T pt="Telefones" en="Phones" /></Link><Link href="/reparacao"><T pt="Reparação" en="Repair" /></Link><Link href="/sobre"><T pt="Sobre" en="About" /></Link><Link href="/contacto"><T pt="Contacto" en="Contact" /></Link></div><div><b><T pt="Fale com a MM" en="Talk to MM" /></b><a href={whatsappUrl("Olá MM, encontrei-vos através do website e gostaria de obter mais informações.")}>WhatsApp · +244 923 933 692</a><a href="https://www.google.com/maps/search/?api=1&query=Pumangol+Bela+Vista+Angola" target="_blank" rel="noreferrer"><T pt="Abrir localização" en="Open location" /></a><span>Bela Vista, <T pt="em frente à Pumangol" en="opposite Pumangol" /></span><span>Angola</span></div></div><div className="wide footerBottom"><span>© 2026 MM</span><span><T pt="Responsável: Quintino Manuel" en="Manager: Quintino Manuel" /></span></div></footer>}
function FloatingWhatsApp(){return <a className="floatingWhatsapp" aria-label="WhatsApp MM" href={whatsappUrl("Olá MM, encontrei-vos através do website e gostaria de obter mais informações.")}><span>✆</span><b>WhatsApp</b></a>}
function ScrollToTop(){const pathname=usePathname();useEffect(()=>{window.scrollTo(0,0)},[pathname]);return null}
export function SiteShell({children}:{children:React.ReactNode}){return <LanguageProvider><ScrollToTop/><Header/><main>{children}</main><Footer/><FloatingWhatsApp/></LanguageProvider>}
