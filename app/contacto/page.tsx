"use client";

import Link from "@/components/InternalLink";
import { ArrowRight, ExternalLink, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { T, useLanguage } from "../../components/LanguageProvider";
import { whatsappUrl } from "../../lib/phones";

const EMAIL = "comercialmm09@gmail.com";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Estrada+100+Sonangol+Angola";

const journeys = [
  { icon: Smartphone, href: "/telefones", pt: ["Quero comprar um telefone", "Conheça os telefones disponíveis e encontre uma opção adequada às suas necessidades.", "Ver telefones"], en: ["I want to buy a phone", "Explore the available phones and find an option suited to your needs.", "View phones"] },
  { icon: Wrench, href: "/reparacao", pt: ["Preciso reparar o meu telefone", "Conte-nos o problema do aparelho e inicie um pedido de assistência.", "Pedir diagnóstico"], en: ["I need to repair my phone", "Tell us about the device problem and start a support request.", "Request a diagnosis"] },
  { icon: ShieldCheck, href: "/peliculas", pt: ["Quero proteger o meu ecrã", "Informe a marca e o modelo para consultar as películas disponíveis para o seu telefone.", "Consultar películas"], en: ["I want to protect my screen", "Enter the brand and model to check the screen protectors available for your phone.", "Check screen protectors"] },
] as const;

export default function ContactPage() {
  const { lang } = useLanguage();
  const whatsapp = whatsappUrl(lang === "pt" ? "Olá MM, encontrei-vos através do website e gostaria de obter mais informações." : "Hello MM, I found you through the website and would like more information.");
  const emailSubject = lang === "pt" ? "Contacto através do website MM" : "Contact through the MM website";
  const emailUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(emailSubject)}`;

  return <main className="contactPremium">
    <section className="contactPremiumHero">
      <div className="contactHeroGrid" aria-hidden="true" />
      <div className="wide contactHeroInner">
        <div>
          <span className="kicker"><i /><T pt="CONTACTO E LOCALIZAÇÃO" en="CONTACT AND LOCATION" /></span>
          <h1><T pt={<>Estamos perto quando precisar.<br /><em>Comprar, reparar ou proteger começa com uma conversa.</em></>} en={<>We are close when you need us.<br /><em>Buying, repairing or protecting starts with a conversation.</em></>} /></h1>
          <p><T pt="Fale com a equipa da MM para consultar telefones disponíveis, solicitar assistência técnica ou verificar películas laser para o seu modelo." en="Talk to the MM team to check available phones, request technical assistance or find laser screen protectors for your model." /></p>
          <div className="contactValueLine"><span><T pt="Venda" en="Sales" /></span><i /><span><T pt="Reparação" en="Repair" /></span><i /><span><T pt="Proteção" en="Protection" /></span></div>
        </div>
        <div className="contactHeroVisual" aria-hidden="true"><div className="contactSignal"><div className="contactSignalOrbit contactSignalOrbitInner"><span /></div><div className="contactSignalOrbit contactSignalOrbitMiddle"><span /></div><div className="contactSignalOrbit contactSignalOrbitOuter"><span /></div><MessageCircle /></div><div className="contactHeroTag"><MapPin /><strong>Estrada nº 100</strong><small><T pt="Em frente às bombas da Sonangol" en="Opposite the Sonangol fuel station" /></small></div></div>
      </div>
    </section>

    <section className="contactJourneys">
      <div className="wide">
        <div className="contactSectionHead"><span className="kicker"><i /><T pt="COMO PODEMOS AJUDAR?" en="HOW CAN WE HELP?" /></span><h2><T pt="Escolha o que precisa para o seu telefone." en="Choose what your phone needs." /></h2><p><T pt="A MM reúne venda, assistência e proteção num só lugar. Escolha uma opção e continue diretamente para o serviço certo." en="MM brings sales, assistance and protection together in one place. Choose an option and continue directly to the right service." /></p></div>
        <div className="contactJourneyGrid">{journeys.map(({ icon: Icon, href, pt, en }, index) => { const copy = lang === "pt" ? pt : en; return <Link href={href} key={href}><div className="contactJourneyTop"><span>0{index + 1}</span><Icon /></div><h3>{copy[0]}</h3><p>{copy[1]}</p><b>{copy[2]} <ArrowRight /></b></Link>; })}</div>
      </div>
    </section>

    <section className="contactChannels">
      <div className="wide">
        <div className="contactSectionHead"><span className="kicker"><i /><T pt="FALE COM A MM" en="CONTACT MM" /></span><h2><T pt="Escolha a forma mais conveniente de falar connosco." en="Choose the most convenient way to contact us." /></h2><p><T pt="Estamos disponíveis através dos nossos canais para responder às suas dúvidas e orientar o próximo passo." en="We are available through our channels to answer your questions and guide the next step." /></p></div>
        <div className="contactChannelGrid">
          <article className="contactWhatsappCard"><div className="contactChannelIcon"><MessageCircle /></div><small>WHATSAPP</small><h3>+244 923 933 692</h3><p><T pt="Envie uma mensagem para consultar telefones, reparações ou películas." en="Send a message to enquire about phones, repairs or screen protectors." /></p><a className="contactPrimaryAction" href={whatsapp}><MessageCircle /><T pt="Falar no WhatsApp" en="Chat on WhatsApp" /><ArrowRight /></a></article>
          <article><div className="contactChannelIcon"><Phone /></div><small><T pt="TELEFONE" en="PHONE" /></small><h3>+244 923 933 692</h3><p><T pt="Prefere falar diretamente? Ligue para a equipa da MM." en="Prefer to speak directly? Call the MM team." /></p><a className="contactSecondaryAction" href="tel:+244923933692"><Phone /><T pt="Ligar agora" en="Call now" /><ArrowRight /></a></article>
          <article><div className="contactChannelIcon"><Mail /></div><small>E-MAIL</small><h3>{EMAIL}</h3><p><T pt="Envie os detalhes do que precisa e a equipa da MM poderá analisar o seu pedido." en="Send the details of what you need so the MM team can review your request." /></p><a className="contactSecondaryAction" href={emailUrl}><Mail /><T pt="Enviar e-mail" en="Send email" /><ArrowRight /></a></article>
        </div>
      </div>
    </section>

    <section className="contactLocation">
      <div className="wide contactLocationGrid">
        <div className="contactLocationCopy"><span className="kicker"><i /><T pt="ONDE ESTAMOS" en="WHERE WE ARE" /></span><h2><T pt="Encontre a MM na Estrada nº 100." en="Find MM on Road No. 100." /></h2><p><T pt="Estamos localizados na Estrada nº 100, em frente às bombas da Sonangol." en="We are located on Road No. 100, opposite the Sonangol fuel station." /></p><a className="contactSecondaryAction" href={MAP_URL} target="_blank" rel="noreferrer"><MapPin /><T pt="Abrir no Google Maps" en="Open in Google Maps" /><ExternalLink /></a></div>
        <a className="contactMapPanel" href={MAP_URL} target="_blank" rel="noreferrer" aria-label={lang === "pt" ? "Abrir localização da MM no Google Maps" : "Open MM location in Google Maps"}><div className="contactMapGrid" /><div className="contactMapRings"><MapPin /></div><img src="/logo-mm.png" alt="" /><strong>MM · ESTRADA Nº 100</strong><span><T pt="Em frente às bombas da Sonangol" en="Opposite the Sonangol fuel station" /></span><b><T pt="Abrir localização" en="Open location" /> <ExternalLink /></b></a>
      </div>
    </section>

    <section className="contactTrust">
      <div className="wide contactTrustInner"><span className="kicker"><i /><T pt="NUM SÓ LUGAR" en="IN ONE PLACE" /></span><h2><T pt="Uma equipa. Três formas de cuidar do seu telefone." en="One team. Three ways to care for your phone." /></h2><p><T pt="Na MM, pode encontrar um novo aparelho, pedir assistência para o telefone que já utiliza ou adicionar proteção ao ecrã. O nosso objetivo é tornar cada passo simples, claro e próximo." en="At MM, you can find a new device, request assistance for the phone you already use or add screen protection. Our goal is to make every step simple, clear and personal." /></p><div><span><Smartphone /><T pt="Comprar" en="Buy" /></span><span><Wrench /><T pt="Reparar" en="Repair" /></span><span><ShieldCheck /><T pt="Proteger" en="Protect" /></span></div></div>
    </section>

    <section className="contactFinalCta"><div className="wide contactFinalPanel"><div><span className="kicker"><i /><T pt="PRONTO PARA COMEÇAR?" en="READY TO BEGIN?" /></span><h2><T pt="Diga-nos o que precisa. A equipa da MM ajuda no próximo passo." en="Tell us what you need. The MM team will help with the next step." /></h2><p><T pt="Escolha o WhatsApp para uma conversa rápida ou envie os detalhes por e-mail." en="Choose WhatsApp for a quick conversation or send the details by email." /></p></div><div className="contactFinalActions"><a className="contactPrimaryAction" href={whatsapp}><MessageCircle /><T pt="Falar no WhatsApp" en="Chat on WhatsApp" /><ArrowRight /></a><a className="contactSecondaryAction" href={emailUrl}><Mail /><T pt="Enviar por e-mail" en="Send by email" /><ArrowRight /></a></div></div></section>
  </main>;
}
