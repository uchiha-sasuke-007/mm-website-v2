"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  HeartHandshake,
  Layers3,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { T, useLanguage } from "../../components/LanguageProvider";

const services = [
  {
    icon: Smartphone,
    href: "/telefones",
    pt: { title: "Venda de telefones", text: "Modelos para diferentes necessidades, estilos e orçamentos, com atendimento para ajudar na escolha.", link: "Ver telefones" },
    en: { title: "Phone sales", text: "Models for different needs, styles and budgets, with personal guidance to help you choose.", link: "View phones" },
  },
  {
    icon: Wrench,
    href: "/reparacao",
    pt: { title: "Reparação", text: "Assistência para problemas comuns do dia a dia, sempre com avaliação antes de qualquer intervenção.", link: "Pedir diagnóstico" },
    en: { title: "Repair", text: "Support for common everyday problems, always with an assessment before any intervention.", link: "Request a diagnosis" },
  },
  {
    icon: ShieldCheck,
    href: "/peliculas",
    pt: { title: "Películas laser", text: "Proteção aplicada com cuidado e opções confirmadas de acordo com a marca e o modelo do telefone.", link: "Ver películas" },
    en: { title: "Laser screen protectors", text: "Protection applied with care, with options confirmed according to your phone brand and model.", link: "View screen protectors" },
  },
] as const;

const values = [
  { icon: Eye, pt: ["Clareza", "Explicamos as opções e o próximo passo de forma simples, sem complicações."], en: ["Clarity", "We explain the options and next step simply, without complications."] },
  { icon: MessageCircle, pt: ["Proximidade", "Queremos que cada cliente se sinta ouvido e bem atendido."], en: ["Personal service", "We want every customer to feel heard and well cared for."] },
  { icon: HeartHandshake, pt: ["Cuidado", "Cada aparelho recebe atenção em cada etapa do atendimento."], en: ["Care", "Every device receives attention at every stage of service."] },
  { icon: Layers3, pt: ["Praticidade", "Venda, reparação e proteção reunidas num só lugar."], en: ["Convenience", "Sales, repair and protection brought together in one place."] },
] as const;

const paths = [
  { icon: Smartphone, href: "/telefones", pt: "Comprar um telefone", en: "Buy a phone" },
  { icon: Wrench, href: "/reparacao", pt: "Reparar o meu telefone", en: "Repair my phone" },
  { icon: ShieldCheck, href: "/peliculas", pt: "Proteger o meu telefone", en: "Protect my phone" },
] as const;

export default function AboutPage() {
  const { lang } = useLanguage();
  return (
    <main className="aboutPremium">
      <section className="aboutPremiumHero">
        <div className="aboutGridGlow" aria-hidden="true" />
        <div className="wide aboutHeroInner">
          <div className="aboutHeroCopy">
            <span className="kicker"><i /><T pt="SOBRE A MM" en="ABOUT MM" /></span>
            <h1><T pt={<>Mais do que vender telefones.<br /><em>Criamos confiança em cada atendimento.</em></>} en={<>More than selling phones.<br /><em>We build trust with every customer.</em></>} /></h1>
            <p><T pt="A MM reúne venda de telefones, assistência técnica e aplicação de películas laser num só lugar, com atendimento próximo, clareza e cuidado em cada detalhe." en="MM brings phone sales, technical assistance and laser screen protector application together in one place, with personal service, clarity and care in every detail." /></p>
            <div className="aboutValueLine"><span><T pt="Tecnologia" en="Technology" /></span><i /><span><T pt="Assistência" en="Assistance" /></span><i /><span><T pt="Proteção" en="Protection" /></span></div>
          </div>
          <div className="aboutHeroMark" aria-hidden="true">
            <div className="aboutOrbit aboutOrbitInner"><span /></div>
            <div className="aboutOrbit aboutOrbitMiddle"><span /></div>
            <div className="aboutOrbit aboutOrbitOuter"><span /></div>
            <img src="/logo-mm.png" alt="" />
          </div>
        </div>
      </section>

      <section className="aboutIdentity">
        <div className="wide aboutIdentityGrid">
          <div className="aboutBrandPanel"><div className="aboutBrandHalo" /><img src="/logo-mm.png" alt="Logo MM" /><strong>MM</strong><span><T pt="Tecnologia mais perto de si" en="Technology closer to you" /></span></div>
          <div className="aboutIdentityCopy">
            <span className="kicker"><i /><T pt="QUEM SOMOS" en="WHO WE ARE" /></span>
            <h2><T pt="Tecnologia mais próxima das pessoas." en="Technology closer to people." /></h2>
            <p><T pt="A MM nasceu com uma proposta simples: tornar a tecnologia mais acessível, o atendimento mais próximo e cada decisão mais clara para o cliente." en="MM began with a simple purpose: to make technology more accessible, service more personal and every decision clearer for the customer." /></p>
            <p><T pt="Num só lugar, reunimos venda de telefones, reparação e aplicação de películas laser para ajudar cada pessoa a escolher, cuidar e proteger melhor o aparelho que utiliza todos os dias." en="In one place, we bring together phone sales, repair and laser screen protector application to help each person choose, care for and better protect the device they use every day." /></p>
            <p><T pt="Mais do que entregar produtos ou serviços, queremos construir uma relação baseada em confiança, transparência e atenção." en="More than delivering products or services, we want to build a relationship based on trust, transparency and attention." /></p>
          </div>
        </div>
      </section>

      <section className="aboutServices">
        <div className="wide">
          <div className="aboutSectionHead"><span className="kicker"><i /><T pt="O QUE FAZEMOS" en="WHAT WE DO" /></span><h2><T pt="Tudo o que o seu telefone precisa num só lugar." en="Everything your phone needs in one place." /></h2></div>
          <div className="aboutServiceGrid">{services.map(({ icon: Icon, href, pt, en }) => { const copy = lang === "pt" ? pt : en; return <Link href={href} className="aboutServiceCard" key={href}><span className="aboutIcon"><Icon /></span><h3>{copy.title}</h3><p>{copy.text}</p><span className="aboutCardLink">{copy.link}<ArrowRight /></span></Link>; })}</div>
        </div>
      </section>

      <section className="aboutWhy">
        <div className="wide">
          <div className="aboutSectionHead"><span className="kicker"><i /><T pt="POR QUE A MM?" en="WHY MM?" /></span><h2><T pt="Um atendimento pensado para ser simples, claro e próximo." en="Service designed to be simple, clear and personal." /></h2></div>
          <div className="aboutValueGrid">{values.map(({ icon: Icon, pt, en }, index) => { const copy = lang === "pt" ? pt : en; return <article key={copy[0]}><div className="aboutValueTop"><b>0{index + 1}</b><Icon /></div><h3>{copy[0]}</h3><p>{copy[1]}</p></article>; })}</div>
        </div>
      </section>

      <section className="aboutPurpose">
        <div className="wide aboutPurposeInner"><Sparkles aria-hidden="true" /><span className="kicker"><i /><T pt="O QUE NOS MOVE" en="WHAT DRIVES US" /></span><h2><T pt="Comprar, reparar ou proteger: queremos tornar cada escolha mais simples." en="Buy, repair or protect: we want to make every choice simpler." /></h2><p><T pt="Um telefone guarda trabalho, contactos, fotografias, conversas e momentos importantes. Por isso, acreditamos que vender, reparar ou proteger um aparelho exige mais do que um serviço rápido — exige atenção." en="A phone holds work, contacts, photographs, conversations and important moments. That is why we believe selling, repairing or protecting a device requires more than fast service — it requires attention." /></p></div>
      </section>

      <section className="aboutFinalCta">
        <div className="wide aboutCtaPanel">
          <div className="aboutCtaIntro"><span className="kicker"><i /><T pt="COMO PODEMOS AJUDAR?" en="HOW CAN WE HELP?" /></span><h2><T pt="O que precisa para o seu telefone hoje?" en="What does your phone need today?" /></h2><p><T pt="Escolha o caminho e fale com a MM." en="Choose the right path and talk to MM." /></p></div>
          <div className="aboutPathGrid">{paths.map(({ icon: Icon, href, pt, en }) => <Link href={href} key={href}><Icon /><span>{lang === "pt" ? pt : en}</span><ArrowRight /></Link>)}</div>
          <div className="aboutCtaTrust"><CheckCircle2 /><T pt="Venda, reparação e proteção com atendimento próximo." en="Sales, repair and protection with personal service." /></div>
        </div>
      </section>
    </main>
  );
}
