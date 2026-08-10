"use client";
import { useState } from "react";
import Link from "next/link";
import { LanguageProvider, T, useLanguage } from "./LanguageProvider";
import { whatsappUrl } from "../lib/phones";

function Header(){
  const [open,setOpen]=useState(false); const {lang,setLang}=useLanguage();
  const nav=[{href:"/",pt:"Início",en:"Home"},{href:"/telefones",pt:"Telefones",en:"Phones"},{href:"/reparacao",pt:"Reparação",en:"Repair"},{href:"/sobre",pt:"Sobre",en:"About"},{href:"/contacto",pt:"Contacto",en:"Contact"}];
  return <header className="siteHeader"><div className="shopTop"><div className="wide"><span><T pt="MM — Smartphones e Reparação em Angola" en="MM — Smartphones and Repair in Angola" /></span><div><a href="/contacto">⌖ <T pt="Bela Vista" en="Bela Vista" /></a><a href="tel:+244923933692">+244 923 933 692</a></div></div></div><div className="wide headerInner">
    <Link className="brand" href="/" aria-label="MM início"><span className="logoFrame"><img src="/logo-mm.png" alt="" /></span><span className="brandName"><b>MM</b><small><T pt="Smartphones e Reparação" en="Smartphones and Repair" /></small></span></Link>
    <button className="menuButton" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Abrir menu"><i/><i/><i/></button>
    <div className={`navPanel ${open?"open":""}`}>
      <nav>{nav.map(n=><Link key={n.href} href={n.href} onClick={()=>setOpen(false)}>{lang==="pt"?n.pt:n.en}</Link>)}</nav>
      <button className="searchHint" aria-label={lang==="pt"?"Pesquisar telefones":"Search phones"}>⌕</button><div className="langSwitch" aria-label="Idioma"><button className={lang==="pt"?"active":""} onClick={()=>setLang("pt")}>PT</button><span>|</span><button className={lang==="en"?"active":""} onClick={()=>setLang("en")}>EN</button></div>
      <a className="headerCta" href={whatsappUrl(lang==="pt"?"Olá MM, gostaria de falar convosco.":"Hello MM, I would like to speak with you.")}><T pt="Falar no WhatsApp" en="Chat on WhatsApp" /> <span>↗</span></a>
    </div>
  </div></header>
}

function Footer(){return <footer className="siteFooter"><div className="wide footerGrid"><div><Link className="brand" href="/"><span className="logoFrame"><img src="/logo-mm.png" alt="" /></span><small><T pt="Smartphones e Reparação" en="Smartphones and Repair" /></small></Link><p><T pt="Tecnologia, atendimento próximo e cuidado técnico em Bela Vista, Angola." en="Technology, personal service and technical care in Bela Vista, Angola." /></p></div><div><b><T pt="Navegação" en="Navigation" /></b><Link href="/telefones"><T pt="Telefones" en="Phones" /></Link><Link href="/reparacao"><T pt="Reparação" en="Repair" /></Link><Link href="/sobre"><T pt="Sobre a MM" en="About MM" /></Link></div><div><b><T pt="Contacto" en="Contact" /></b><a href="tel:+244923933692">+244 923 933 692</a><span>Bela Vista, <T pt="em frente à Pumangol" en="opposite Pumangol" /></span><span>Angola</span></div></div><div className="wide footerBottom"><span>© 2026 MM</span><span><T pt="Responsável: Quintino Manuel" en="Manager: Quintino Manuel" /></span></div></footer>}

function FloatingWhatsApp(){return <a className="floatingWhatsapp" aria-label="WhatsApp MM" href={whatsappUrl("Olá MM, vim pelo website e gostaria de obter mais informações.")}><span>✆</span><b>WhatsApp</b></a>}
export function SiteShell({children}:{children:React.ReactNode}){return <LanguageProvider><Header/><main>{children}</main><Footer/><FloatingWhatsApp/></LanguageProvider>}
