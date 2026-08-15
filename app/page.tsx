"use client";

import Link from "next/link";
import { BatteryCharging, Camera, CircleEllipsis, Gauge, MessageCircle, MessagesSquare, Power, Search, ShieldCheck, Smartphone, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { T, useLanguage } from "../components/LanguageProvider";
import { phones } from "../lib/phones";
import { HeroPhoneCarousel } from "../components/HeroPhoneCarousel";

const issues: [LucideIcon, string, string][] = [
  [Smartphone, "Ecrã partido", "Broken screen"], [BatteryCharging, "Bateria descarrega rápido", "Battery drains quickly"],
  [Zap, "Telefone não carrega", "Phone does not charge"], [Power, "Telefone não liga", "Phone does not turn on"],
  [Gauge, "Problemas de software", "Software issues"], [Camera, "Câmara ou som", "Camera or sound"],
  [CircleEllipsis, "Outro problema", "Other issue"],
];

const trust: [LucideIcon, string, string, string, string][] = [
  [MessagesSquare, "Atendimento sem complicação", "Falamos consigo de forma clara e procuramos tornar tudo simples.", "Straightforward service", "We speak clearly and aim to keep everything simple."],
  [Search, "Avaliação antes do serviço", "Entendemos o problema antes de indicar o próximo passo.", "Assessment before service", "We understand the issue before suggesting the next step."],
  [ShieldCheck, "Escolha com confiança", "Veja as opções disponíveis e tire dúvidas antes de decidir.", "Choose with confidence", "See available options and ask before deciding."],
  [MessageCircle, "Contacto directo", "Fale directamente com a MM pelo WhatsApp.", "Direct contact", "Talk directly to MM on WhatsApp."],
];

// ASSETS VISUAIS DE DEMONSTRAÇÃO — substituir por fotografias do stock real antes da publicação oficial.
const heroVisuals = [
  { src: "/phones/iphone-17-pro-max.png", name: "iPhone 17 Pro Max" },
  { src: "/phones/galaxy-s26-ultra.png", name: "Galaxy S26 Ultra" },
  { src: "/phones/tecno-camon-50-ultra.png", name: "TECNO CAMON 50 Ultra 5G" },
];

export default function Home() {
  const { lang } = useLanguage();
  const featured = phones.slice(0, 4);

  return <div className="referenceHome">
    <section className="referenceHero"><div className="wide referenceHeroGrid">
      <div className="referenceHeroCopy">
        <span className="referenceBadge"><T pt="TECNOLOGIA, CONFIANÇA E QUALIDADE" en="TECHNOLOGY, TRUST AND QUALITY" /></span>
        <h1><T pt={<><span>Encontre o telefone<br/>certo para si.</span><em>E conte connosco para cuidar dele.</em></>} en={<><span>Find the right phone<br/>for you.</span><em>And count on us to take care of it.</em></>} /></h1>
        <p className="heroSubtitle"><T pt="Venda, reparação e proteção de telefones num só lugar." en="Phone sales, repair and protection in one place." /></p>
        <p className="heroDescription"><T pt="Telefones selecionados, assistência especializada e proteção para o seu aparelho — estamos localizados na Bela Vista, frente às bombas da Pumangol." en="Selected phones, specialist assistance and protection for your device — we are located in Bela Vista, opposite the Pumangol fuel station." /></p>
        <div className="referenceActions"><Link href="/telefones"><T pt="Ver telefones" en="View phones" /> →</Link><Link href="/reparacao"><T pt="Reparar o meu telefone" en="Repair my phone" /> →</Link></div>
      </div>

      <HeroPhoneCarousel phones={heroVisuals} lang={lang} />

      <aside className="referenceSideCards">
        <Link href="/telefones"><div><small><T pt="Venda de telefones" en="Phone sales" /></small><p><T pt="Encontre modelos selecionados para diferentes necessidades e orçamentos." en="Find selected models for different needs and budgets." /></p><span><T pt="Ver telefones" en="View phones" /> →</span></div><img src={phones[0].image} alt=""/></Link>
        <Link href="/reparacao"><div><small><T pt="Reparação de telefones" en="Phone repair" /></small><p><T pt="Ecrã partido, bateria, carregamento ou outro problema? Fale connosco." en="Broken screen, battery, charging or another problem? Talk to us." /></p><span><T pt="Ver reparação" en="View repair services" /> →</span></div><img src="https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=700&q=85" alt=""/></Link>
        <Link href="/peliculas" className="laserFilmCard"><div><b className="laserFilmBadge"><T pt="PROTEÇÃO REFORÇADA" en="ENHANCED PROTECTION" /></b><small><T pt="Películas laser" en="Laser screen protectors" /></small><p><T pt="Mais resistência e proteção para o seu ecrã no dia a dia." en="Greater resistance and protection for your screen every day." /></p><span><T pt="Ver películas laser" en="View laser screen protectors" /> →</span></div><img src="https://d2yoo3qu6vrk5d.cloudfront.net/pulzo-lite/images-resized/PP3729246-h-o.webp" alt=""/></Link>
      </aside>
    </div></section>

    <div className="wide referenceDashboard">
      <section className="referenceBrands"><header><b><T pt="PROCURE POR MARCA" en="SHOP BY BRAND" /></b></header><div>{[["Apple","/brands/apple-official.png","Ver modelos","View models"],["Samsung","/brands/samsung-official.png","Ver modelos","View models"],["Tecno","/brands/tecno-official.png","Ver modelos","View models"],["Infinix","/brands/infinix-official.png","Ver modelos","View models"],["Outros","•••","Explorar","Explore"]].map(([brand,logo,pt,en]) => <Link href={`/telefones?marca=${brand}`} className={`brandCard brandCard${brand}`} key={brand}>{brand === "Outros" ? <strong>{logo}</strong> : <span className="brandLogoArea"><img className="brandLogo" src={logo} alt={`${brand} logo`}/></span>}<b>{brand === "Outros" ? (lang === "pt" ? "Mais marcas" : "More brands") : brand}</b><small>{lang === "pt" ? pt : en} →</small></Link>)}</div></section>

      <section className="referenceProducts"><header><div><small><T pt="TELEFONES EM DESTAQUE" en="FEATURED PHONES" /></small><h2><T pt="Modelos disponíveis na MM." en="Models available at MM." /></h2></div><Link href="/telefones"><T pt="Ver todos os telefones" en="View all phones" /> →</Link></header><div>{featured.map((phone) => <Link href={`/telefones/${phone.slug}`} className="referenceProductCard" aria-label={lang === "pt" ? `Ver detalhes do ${phone.model}` : `View details for ${phone.model}`} key={phone.slug}><div className="referenceProductImage"><span>{phone.condition === "Novo" ? (lang === "pt" ? "NOVO" : "NEW") : (lang === "pt" ? "SEMINOVO" : "PRE-OWNED")}</span><img src={phone.image} alt={phone.model}/></div><div><small>{phone.brand}</small><h3>{phone.model}</h3><p>{phone.storage}</p><b>{lang === "pt" ? phone.price : "Ask for price"}</b><span className="referenceProductDetails"><T pt="Ver detalhes" en="View details" /> →</span></div></Link>)}</div></section>

      <section className="referenceRepair"><div><small><T pt="CUIDADO TÉCNICO" en="TECHNICAL CARE" /></small><h2><T pt={<>O seu telefone está com problemas?<br/><em>Nós ajudamos a encontrar a solução.</em></>} en={<>Is your phone having problems?<br/><em>We help you find the solution.</em></>} /></h2><p><T pt="Ecrã, bateria, carregamento, software ou outro problema? Conte-nos o que aconteceu." en="Screen, battery, charging, software or another problem? Tell us what happened." /></p><Link href="/reparacao"><T pt="Quero reparar o meu telefone" en="I want to repair my phone" /> →</Link></div><div className="referenceIssues">{issues.map(([Icon, pt, en]) => <Link key={pt as string} href={`/reparacao?problema=${encodeURIComponent(pt as string)}`}><i><Icon size={18} strokeWidth={2.25}/></i><span>{lang === "pt" ? pt : en}</span></Link>)}</div></section>

      <section className="referenceTrust">{trust.map(([Icon, ptTitle, ptText, enTitle, enText]) => <article key={ptTitle as string}><i><Icon size={18}/></i><div><b>{lang === "pt" ? ptTitle : enTitle}</b><p>{lang === "pt" ? ptText : enText}</p></div></article>)}</section>
    </div>
  </div>;
}
