"use client";

import Link from "next/link";
import { T, useLanguage } from "../components/LanguageProvider";
import { phones, whatsappUrl } from "../lib/phones";

const issues = [
  ["▱", "Ecrã partido", "Broken screen"], ["▣", "Bateria descarrega rápido", "Battery drains quickly"],
  ["ϟ", "Telefone não carrega", "Phone does not charge"], ["◌", "Telefone não liga", "Phone does not turn on"],
  ["⌘", "Problemas de software", "Software issues"], ["◉", "Câmara ou som", "Camera or sound"],
  ["•••", "Outro problema", "Other issue"],
];

const trust = [
  ["◯", "Atendimento sem complicação", "Falamos consigo de forma clara e procuramos tornar tudo simples.", "Straightforward service", "We speak clearly and aim to keep everything simple."],
  ["⌕", "Avaliação antes do serviço", "Entendemos o problema antes de indicar o próximo passo.", "Assessment before service", "We understand the issue before suggesting the next step."],
  ["◇", "Escolha com confiança", "Veja as opções disponíveis e tire dúvidas antes de decidir.", "Choose with confidence", "See available options and ask before deciding."],
  ["✆", "Contacto directo", "Fale directamente com a MM pelo WhatsApp.", "Direct contact", "Talk directly to MM on WhatsApp."],
];

export default function Home() {
  const { lang } = useLanguage();
  const featured = phones.slice(0, 4);

  return <div className="referenceHome">
    <section className="referenceHero"><div className="wide referenceHeroGrid">
      <div className="referenceHeroCopy">
        <span className="referenceBadge"><T pt="TECNOLOGIA MAIS PERTO DE SI" en="TECHNOLOGY CLOSER TO YOU" /></span>
        <h1><T pt={<>O telefone que procura.<br/><em>O cuidado que ele merece.</em></>} en={<>The phone you want.<br/><em>The care it deserves.</em></>} /></h1>
        <p><T pt={<>Venda e reparação de telefones<br/><strong>num só lugar.</strong></>} en={<>Phone sales and repair<br/><strong>in one place.</strong></>} /></p>
        <div className="referenceProof">
          <span><i>♡</i><b><T pt="Atendimento próximo" en="Personal service" /></b><small><T pt="Sempre ao seu lado." en="Always by your side." /></small></span>
          <span><i>⌕</i><b><T pt="Avaliação cuidadosa" en="Careful assessment" /></b><small><T pt="Primeiro entendemos." en="We understand first." /></small></span>
          <span><i>⌖</i><b>Bela Vista, Angola</b><small><T pt="Em frente à Pumangol." en="Opposite Pumangol." /></small></span>
        </div>
        <div className="referenceActions"><Link href="/telefones"><T pt="Quero comprar um telefone" en="I want to buy a phone" /> →</Link><Link href="/reparacao"><T pt="Preciso reparar o meu telefone" en="I need to repair my phone" /> →</Link></div>
      </div>

      <div className="referencePhones" aria-label={lang === "pt" ? "Telefones em destaque" : "Featured phones"}>
        <div className="referenceBeam"/>
        {phones.slice(0, 3).map((phone, index) => <Link href={`/telefones/${phone.slug}`} className={`referencePhone p${index + 1}`} key={phone.slug}><img src={phone.image} alt={phone.model}/></Link>)}
      </div>

      <aside className="referenceSideCards">
        <Link href="/telefones"><div><small><T pt="Venda de telefones" en="Phone sales" /></small><p><T pt="Modelos para diferentes necessidades e orçamentos." en="Models for different needs and budgets." /></p><span><T pt="Ver telefones" en="View phones" /> →</span></div><img src={phones[0].image} alt=""/></Link>
        <Link href="/reparacao"><div><small><T pt="Reparação de telefones" en="Phone repair" /></small><p><T pt="Conte-nos o que aconteceu ao seu aparelho." en="Tell us what happened to your device." /></p><span><T pt="Saber mais" en="Learn more" /> →</span></div><img src="https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=700&q=85" alt=""/></Link>
        <a href={whatsappUrl(lang === "pt" ? "Olá MM, encontrei-vos através do website e gostaria de obter mais informações." : "Hello MM, I found you through the website and would like more information.")}><div><small>WhatsApp</small><p><T pt="Fale directamente com a equipa da MM." en="Talk directly to the MM team." /></p><span><T pt="Enviar mensagem" en="Send a message" /> →</span></div><b>✆</b></a>
      </aside>
    </div></section>

    <div className="wide referenceDashboard">
      <section className="referenceChoices">
        <Link href="/telefones"><i>♧</i><div><small><T pt="QUERO UM TELEFONE" en="I WANT A PHONE" /></small><h2><T pt="O seu próximo telefone pode estar mais perto do que imagina." en="Your next phone may be closer than you think." /></h2><p><T pt="Descubra modelos para diferentes estilos, necessidades e orçamentos." en="Discover models for different styles, needs and budgets." /></p><span><T pt="Ver telefones" en="View phones" /> →</span></div><img src={phones[2].image} alt=""/></Link>
        <Link href="/reparacao"><i>⌁</i><div><small><T pt="PRECISO DE REPARAÇÃO" en="I NEED A REPAIR" /></small><h2><T pt="Quebrou? Fale connosco antes de desistir do seu telefone." en="Broken? Talk to us before giving up on your phone." /></h2><p><T pt="Conte-nos o que aconteceu. A MM ajuda a identificar o próximo passo." en="Tell us what happened. MM helps identify the next step." /></p><span><T pt="Pedir assistência" en="Request assistance" /> →</span></div></Link>
      </section>

      <section className="referenceBrands"><header><b><T pt="PROCURE POR MARCA" en="SHOP BY BRAND" /></b><Link href="/telefones"><T pt="Ver catálogo completo" en="View full catalogue" /> →</Link></header><div>{[["Apple","A","Ver iPhones","View iPhones"],["Samsung","S","Ver Galaxy","View Galaxy"],["Tecno","T","Ver modelos","View models"],["Infinix","I","Ver modelos","View models"],["Outros","•••","Explorar","Explore"]].map(([brand,icon,pt,en]) => <Link href={`/telefones?marca=${brand}`} key={brand}><strong>{icon}</strong><b>{brand === "Outros" ? (lang === "pt" ? "Mais marcas" : "More brands") : brand}</b><small>{lang === "pt" ? pt : en} →</small></Link>)}</div></section>

      <section className="referenceProducts"><header><div><small><T pt="TELEFONES EM DESTAQUE" en="FEATURED PHONES" /></small><h2><T pt="Modelos apresentados pela MM." en="Models presented by MM." /></h2></div><Link href="/telefones"><T pt="Ver todos os telefones" en="View all phones" /> →</Link></header><div>{featured.map((phone) => <article key={phone.slug}><Link href={`/telefones/${phone.slug}`} className="referenceProductImage"><span>{phone.condition === "Novo" ? (lang === "pt" ? "NOVO" : "NEW") : (lang === "pt" ? "SEMINOVO" : "PRE-OWNED")}</span><img src={phone.image} alt={phone.model}/></Link><div><small>{phone.brand}</small><h3>{phone.model}</h3><p>{phone.storage}</p><b>{lang === "pt" ? phone.price : "Ask for price"}</b><Link href={`/telefones/${phone.slug}`}><T pt="Ver detalhes" en="View details" /> →</Link></div></article>)}</div></section>

      <section className="referenceRepair"><div><small><T pt="CUIDADO TÉCNICO" en="TECHNICAL CARE" /></small><h2><T pt={<>Um problema no telefone<br/><em>não precisa parar o seu dia.</em></>} en={<>A phone problem<br/><em>does not have to stop your day.</em></>} /></h2><p><T pt="Conte-nos o que aconteceu e ajudamos a identificar o próximo passo." en="Tell us what happened and we will help identify the next step." /></p><Link href="/reparacao"><T pt="Quero reparar o meu telefone" en="I want to repair my phone" /> →</Link></div><div className="referenceIssues">{issues.map(([icon,pt,en]) => <Link key={pt} href={`/reparacao?problema=${encodeURIComponent(pt)}`}><i>{icon}</i><span>{lang === "pt" ? pt : en}</span></Link>)}</div></section>

      <section className="referenceTrust">{trust.map((item) => <article key={item[1]}><i>{item[0]}</i><div><b>{lang === "pt" ? item[1] : item[3]}</b><p>{lang === "pt" ? item[2] : item[4]}</p></div></article>)}</section>
    </div>
  </div>;
}
