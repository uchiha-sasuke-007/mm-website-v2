"use client";

import Link from "next/link";
import { BatteryCharging, Camera, CircleEllipsis, Gauge, MapPin, MessageCircle, MessagesSquare, Power, Search, ShieldCheck, ShoppingBag, Smartphone, Wrench, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { T, useLanguage } from "../components/LanguageProvider";
import { phones } from "../lib/phones";

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
  "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTExL3JtNTUxLTI5LWlwaG9uZV8xLnBuZw.png",
  "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTExL3JtNTUxLTI0LWlwaG9uZS0yNC1jLW1vY2t1cF8yLnBuZw.png",
  "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3Y1ODUtYWV3LTA5LWRldmljZW1vY2t1cC1qb2IxNzM4LnBuZw.png",
];

export default function Home() {
  const { lang } = useLanguage();
  const featured = phones.slice(0, 4);

  return <div className="referenceHome">
    <section className="referenceHero"><div className="wide referenceHeroGrid">
      <div className="referenceHeroCopy">
        <span className="referenceBadge"><T pt="TECNOLOGIA MAIS PERTO DE SI" en="TECHNOLOGY CLOSER TO YOU" /></span>
        <h1><T pt={<>O telefone que procura.<br/><em>O cuidado que ele merece.</em></>} en={<>The phone you want.<br/><em>The care it deserves.</em></>} /></h1>
        <p><T pt={<>Venda, reparação e proteção de telefones<br/><strong>num só lugar.</strong></>} en={<>Phone sales, repair and protection<br/><strong>in one place.</strong></>} /></p>
        <div className="referenceProof">
          <span><i><MessageCircle size={16}/></i><b><T pt="Atendimento próximo" en="Personal service" /></b><small><T pt="Sempre ao seu lado." en="Always by your side." /></small></span>
          <span><i><Gauge size={16}/></i><b><T pt="Avaliação cuidadosa" en="Careful assessment" /></b><small><T pt="Primeiro entendemos." en="We understand first." /></small></span>
          <span><i><MapPin size={16}/></i><b>Bela Vista, Angola</b><small><T pt="Em frente à Pumangol." en="Opposite Pumangol." /></small></span>
        </div>
        <div className="referenceActions"><Link href="/telefones"><T pt="Quero comprar um telefone" en="I want to buy a phone" /> →</Link><Link href="/reparacao"><T pt="Preciso reparar o meu telefone" en="I need to repair my phone" /> →</Link></div>
      </div>

      <div className="referencePhones" aria-label={lang === "pt" ? "Telefones em destaque" : "Featured phones"}>
        <div className="referenceBeam"/>
        {heroVisuals.map((image, index) => <Link href="/telefones" className={`referencePhone p${index + 1}`} key={image}><img src={image} alt={lang === "pt" ? "Apresentação visual de telefone premium" : "Premium phone visual presentation"}/></Link>)}
      </div>

      <aside className="referenceSideCards">
        <Link href="/telefones"><div><small><T pt="Venda de telefones" en="Phone sales" /></small><p><T pt="Modelos para diferentes necessidades e orçamentos." en="Models for different needs and budgets." /></p><span><T pt="Ver telefones" en="View phones" /> →</span></div><img src={phones[0].image} alt=""/></Link>
        <Link href="/reparacao"><div><small><T pt="Reparação de telefones" en="Phone repair" /></small><p><T pt="Conte-nos o que aconteceu ao seu aparelho." en="Tell us what happened to your device." /></p><span><T pt="Saber mais" en="Learn more" /> →</span></div><img src="https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=700&q=85" alt=""/></Link>
        <Link href="/peliculas"><div><small><T pt="Películas de proteção" en="Screen protection" /></small><p><T pt="Proteção profissional para ajudar a preservar o seu ecrã." en="Professional protection to help preserve your screen." /></p><span><T pt="Ver opções" en="View options" /> →</span></div><img src="https://d2yoo3qu6vrk5d.cloudfront.net/pulzo-lite/images-resized/PP3729246-h-o.webp" alt=""/></Link>
      </aside>
    </div></section>

    <div className="wide referenceDashboard">
      <section className="referenceChoices">
        <Link href="/telefones"><i><ShoppingBag size={21}/></i><div><small><T pt="QUERO UM TELEFONE" en="I WANT A PHONE" /></small><h2><T pt="O seu próximo telefone pode estar mais perto do que imagina." en="Your next phone may be closer than you think." /></h2><p><T pt="Descubra modelos para diferentes estilos, necessidades e orçamentos." en="Discover models for different styles, needs and budgets." /></p><span><T pt="Ver telefones" en="View phones" /> →</span></div><img src={phones[2].image} alt=""/></Link>
        <Link href="/reparacao"><i><Wrench size={21}/></i><div><small><T pt="PRECISO DE REPARAÇÃO" en="I NEED A REPAIR" /></small><h2><T pt="Quebrou? Fale connosco antes de desistir do seu telefone." en="Broken? Talk to us before giving up on your phone." /></h2><p><T pt="Conte-nos o que aconteceu. A MM ajuda a identificar o próximo passo." en="Tell us what happened. MM helps identify the next step." /></p><span><T pt="Pedir assistência" en="Request assistance" /> →</span></div></Link>
        <Link href="/peliculas"><i><ShieldCheck size={21}/></i><div><small><T pt="QUERO PROTEGER" en="I WANT PROTECTION" /></small><h2><T pt="Uma película hoje pode ajudar a evitar problemas amanhã." en="A screen protector today can help prevent problems tomorrow." /></h2><p><T pt="Proteção para ajudar a preservar o ecrã no dia a dia." en="Protection to help preserve your screen every day." /></p><span><T pt="Ver películas" en="View options" /> →</span></div></Link>
      </section>

      <section className="referenceBrands"><header><b><T pt="PROCURE POR MARCA" en="SHOP BY BRAND" /></b><Link href="/telefones"><T pt="Ver catálogo completo" en="View full catalogue" /> →</Link></header><div>{[["Apple","A","Ver iPhones","View iPhones"],["Samsung","S","Ver Galaxy","View Galaxy"],["Tecno","T","Ver modelos","View models"],["Infinix","I","Ver modelos","View models"],["Outros","•••","Explorar","Explore"]].map(([brand,icon,pt,en]) => <Link href={`/telefones?marca=${brand}`} key={brand}><strong>{icon}</strong><b>{brand === "Outros" ? (lang === "pt" ? "Mais marcas" : "More brands") : brand}</b><small>{lang === "pt" ? pt : en} →</small></Link>)}</div></section>

      <section className="referenceProducts"><header><div><small><T pt="TELEFONES EM DESTAQUE" en="FEATURED PHONES" /></small><h2><T pt="Modelos apresentados pela MM." en="Models presented by MM." /></h2></div><Link href="/telefones"><T pt="Ver todos os telefones" en="View all phones" /> →</Link></header><div>{featured.map((phone) => <article key={phone.slug}><Link href={`/telefones/${phone.slug}`} className="referenceProductImage"><span>{phone.condition === "Novo" ? (lang === "pt" ? "NOVO" : "NEW") : (lang === "pt" ? "SEMINOVO" : "PRE-OWNED")}</span><img src={phone.image} alt={phone.model}/></Link><div><small>{phone.brand}</small><h3>{phone.model}</h3><p>{phone.storage}</p><b>{lang === "pt" ? phone.price : "Ask for price"}</b><Link href={`/telefones/${phone.slug}`}><T pt="Ver detalhes" en="View details" /> →</Link></div></article>)}</div></section>

      <section className="referenceRepair"><div><small><T pt="CUIDADO TÉCNICO" en="TECHNICAL CARE" /></small><h2><T pt={<>Um problema no telefone<br/><em>não precisa parar o seu dia.</em></>} en={<>A phone problem<br/><em>does not have to stop your day.</em></>} /></h2><p><T pt="Conte-nos o que aconteceu e ajudamos a identificar o próximo passo." en="Tell us what happened and we will help identify the next step." /></p><Link href="/reparacao"><T pt="Quero reparar o meu telefone" en="I want to repair my phone" /> →</Link></div><div className="referenceIssues">{issues.map(([Icon, pt, en]) => <Link key={pt as string} href={`/reparacao?problema=${encodeURIComponent(pt as string)}`}><i><Icon size={15}/></i><span>{lang === "pt" ? pt : en}</span></Link>)}</div></section>

      <section className="referenceTrust">{trust.map(([Icon, ptTitle, ptText, enTitle, enText]) => <article key={ptTitle as string}><i><Icon size={18}/></i><div><b>{lang === "pt" ? ptTitle : enTitle}</b><p>{lang === "pt" ? ptText : enText}</p></div></article>)}</section>
    </div>
  </div>;
}
