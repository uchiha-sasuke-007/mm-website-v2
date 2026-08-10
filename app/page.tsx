"use client";

import Link from "next/link";
import { T, useLanguage } from "../components/LanguageProvider";
import { phones, whatsappUrl } from "../lib/phones";

const repairProblems = [
  ["Ecrã partido", "Broken screen"],
  ["Bateria descarrega rápido", "Battery drains quickly"],
  ["Telefone não carrega", "Phone does not charge"],
  ["Telefone não liga", "Phone does not turn on"],
  ["Problemas de software", "Software issues"],
  ["Câmara ou som", "Camera or sound"],
  ["Outro problema", "Other issue"],
];

const trustReasons = [
  ["♡", "Atendimento sem complicação", "Falamos consigo de forma clara e procuramos tornar todo o processo simples.", "Straightforward service", "We speak clearly and aim to make the whole process simple."],
  ["◇", "Escolha com confiança", "Veja as opções disponíveis e tire dúvidas antes de decidir.", "Choose with confidence", "See the available options and ask questions before deciding."],
  ["⌕", "Cuidado com o seu aparelho", "Primeiro entendemos o problema antes de indicar o próximo passo.", "Care for your device", "We first understand the problem before suggesting the next step."],
  ["✆", "Estamos a uma mensagem de distância", "Fale directamente com a MM pelo WhatsApp.", "One message away", "Talk directly to MM on WhatsApp."],
];

export default function Home() {
  const { lang } = useLanguage();
  const featured = phones.slice(0, 4);
  const heroPhone = phones[0];
  const generalMessage = lang === "pt"
    ? "Olá MM, encontrei-vos através do website e gostaria de obter mais informações."
    : "Hello MM, I found you through the website and would like more information.";

  return <>
    <section className="storeHero">
      <div className="heroBlob one"/><div className="heroBlob two"/>
      <div className="wide storeHeroGrid">
        <div className="storeHeroCopy">
          <span className="shopBadge"><T pt="TECNOLOGIA MAIS PERTO DE SI" en="TECHNOLOGY CLOSER TO YOU" /></span>
          <h1><T pt={<>O telefone que procura.<br/><em>O cuidado que ele merece.</em></>} en={<>The phone you want.<br/><em>The care it deserves.</em></>} /></h1>
          <p><T pt="Na MM encontra telefones para diferentes necessidades e assistência para quando o seu aparelho precisar de cuidado." en="At MM you will find phones for different needs and assistance whenever your device needs care." /></p>
          <div className="actionRow">
            <Link className="btn blue" href="/telefones"><T pt="Quero comprar um telefone" en="I want to buy a phone" /> <span>→</span></Link>
            <Link className="btn soft" href="/reparacao"><T pt="Preciso reparar o meu telefone" en="I need to repair my phone" /></Link>
          </div>
          <div className="heroAssurance"><span>✓ <T pt="Atendimento próximo" en="Personal service" /></span><span>✓ Bela Vista, Angola</span></div>
        </div>
        <div className="showcase">
          <div className="showcaseGlow"/>
          <div className="showPhone phoneBack"><img src={phones[1].image} alt={phones[1].model}/></div>
          <div className="showPhone phoneMain"><img src={heroPhone.image} alt={heroPhone.model}/><span className="newTag"><T pt="EM DESTAQUE" en="FEATURED" /></span></div>
          <div className="showPhone phoneSide"><img src={phones[2].image} alt={phones[2].model}/></div>
          <div className="showPrice heroProductCard">
            <small><T pt="MODELO EM DESTAQUE" en="FEATURED MODEL" /></small>
            <b>{heroPhone.model}</b>
            <Link href={`/telefones/${heroPhone.slug}`} aria-label={lang === "pt" ? `Consultar disponibilidade do ${heroPhone.model}` : `Check ${heroPhone.model} availability`}>
              <span><T pt="Consultar disponibilidade" en="Check availability" /></span> ↗
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="helpToday"><div className="wide">
      <div className="helpHeading"><span className="sectionLabel">MM</span><h2><T pt="Como podemos ajudar hoje?" en="How can we help today?" /></h2></div>
      <div className="helpPaths">
        <article className="buyPath"><div><small><T pt="QUERO UM TELEFONE" en="I WANT A PHONE" /></small><h3><T pt="O seu próximo telefone pode estar mais perto do que imagina." en="Your next phone may be closer than you think." /></h3><p><T pt="Descubra modelos para diferentes estilos, necessidades e orçamentos." en="Discover models for different styles, needs and budgets." /></p><Link href="/telefones"><T pt="Ver telefones" en="View phones" /> →</Link></div><img src={heroPhone.image} alt=""/></article>
        <article className="repairPath"><div><small><T pt="PRECISO DE REPARAÇÃO" en="I NEED A REPAIR" /></small><h3><T pt="Quebrou? Fale connosco antes de desistir do seu telefone." en="Broken? Talk to us before giving up on your phone." /></h3><p><T pt="Conte-nos o que aconteceu. A MM ajuda a encontrar a melhor solução." en="Tell us what happened. MM helps you find the best solution." /></p><Link href="/reparacao"><T pt="Pedir assistência" en="Request assistance" /> →</Link></div><img src="https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=900&q=90" alt=""/></article>
      </div>
    </div></section>

    <section className="quickShop"><div className="wide">
      <div className="quickTitle"><b><T pt="Explore por marca" en="Explore by brand" /></b><Link href="/telefones"><T pt="Ver catálogo completo" en="View full catalogue" /> →</Link></div>
      <div className="categoryGrid brandOnly">{[
        ["Apple", "A", "Ver iPhones", "View iPhones"], ["Samsung", "S", "Ver Galaxy", "View Galaxy"], ["Tecno", "T", "Ver modelos", "View models"], ["Infinix", "I", "Ver modelos", "View models"], ["Outros", "+", "Explorar", "Explore"],
      ].map(([name, icon, ptAction, enAction]) => <Link href={`/telefones?marca=${name}`} key={name}><span>{icon}</span><b>{name === "Outros" ? (lang === "pt" ? "Outras marcas" : "Other brands") : name}</b><small>{lang === "pt" ? ptAction : enAction} →</small></Link>)}</div>
    </div></section>

    <section className="featuredStore"><div className="wide">
      <div className="shopSectionHead"><div><span><T pt="SELECÇÃO DA MM" en="MM SELECTION" /></span><h2><T pt="Telefones em destaque" en="Featured phones" /></h2><p><T pt="Veja alguns dos modelos apresentados pela MM." en="See some of the models presented by MM." /></p></div><Link href="/telefones"><T pt="Ver todos os telefones" en="View all phones" /> →</Link></div>
      <div className="storeProductGrid">{featured.map((phone) => <article className="storeProduct" key={phone.slug}>
        <Link className="storeProductImage" href={`/telefones/${phone.slug}`}><span>{phone.available ? (lang === "pt" ? "Consultar" : "Enquire") : (lang === "pt" ? "Sob consulta" : "Ask us")}</span><img src={phone.image} alt={phone.model}/></Link>
        <div className="storeProductBody"><small>{phone.brand}</small><h3>{phone.model}</h3><div className="productMeta"><span>{phone.storage}</span><span>{phone.condition === "Novo" ? (lang === "pt" ? "Novo" : "New") : (lang === "pt" ? "Seminovo" : "Pre-owned")}</span></div><strong>{lang === "pt" ? phone.price : "Ask for price"}</strong><div className="storeActions"><Link href={`/telefones/${phone.slug}`}><T pt="Ver detalhes" en="View details" /></Link><a href={whatsappUrl(lang === "pt" ? `Olá MM, vi o ${phone.model} no website e gostaria de saber mais informações.` : `Hello MM, I saw the ${phone.model} on the website and would like more information.`)}>WhatsApp ↗</a></div></div>
      </article>)}</div>
    </div></section>

    <section className="repairShop"><div className="wide repairShopGrid">
      <div className="repairPhoto"><img src="https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=1200&q=90" alt=""/><div className="repairPhotoBadge"><span>✓</span><div><small><T pt="PRIMEIRO PASSO" en="FIRST STEP" /></small><b><T pt="Compreender o problema" en="Understand the problem" /></b></div></div></div>
      <div className="repairShopCopy"><span className="sectionLabel"><T pt="REPARAÇÃO DE TELEFONES" en="PHONE REPAIR" /></span><h2><T pt={<>Um problema no telefone não precisa<br/><em>parar o seu dia.</em></>} en={<>A phone problem does not have to<br/><em>stop your day.</em></>} /></h2><p><T pt="Conte-nos o que aconteceu e ajudamos a identificar o próximo passo." en="Tell us what happened and we will help identify the next step." /></p>
        <div className="repairChips repairIssueLinks">{repairProblems.map(([pt, en]) => <Link key={pt} href={`/reparacao?problema=${encodeURIComponent(pt)}`}>{lang === "pt" ? pt : en} <span>→</span></Link>)}</div>
        <Link className="btn blue" href="/reparacao"><T pt="Quero reparar o meu telefone" en="I want to repair my phone" /> →</Link>
      </div>
    </div></section>

    <section className="trustShop"><div className="wide">
      <div className="shopSectionHead"><div><span>MM</span><h2><T pt="Por que escolher a MM?" en="Why choose MM?" /></h2></div></div>
      <div className="trustCards detailedTrust">{trustReasons.map((reason) => <div key={reason[1]}><span>{reason[0]}</span><b>{lang === "pt" ? reason[1] : reason[3]}</b><p>{lang === "pt" ? reason[2] : reason[4]}</p></div>)}</div>
    </div></section>

    <section className="homeFinalCta"><div className="wide"><div><small>MM</small><h2><T pt="Ainda tem uma dúvida? Fale directamente com a MM." en="Still have a question? Talk directly to MM." /></h2><p><T pt="Estamos disponíveis para ajudar com telefones, disponibilidade e reparações." en="We are available to help with phones, availability and repairs." /></p></div><a className="btn blue" href={whatsappUrl(generalMessage)}><T pt="Falar no WhatsApp" en="Talk on WhatsApp" /> ↗</a></div></section>
  </>;
}
