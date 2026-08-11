"use client";

import { Check, MessageCircle, ShieldCheck, Sparkles, Smartphone } from "lucide-react";
import { T, useLanguage } from "../../components/LanguageProvider";
import { whatsappUrl } from "../../lib/phones";

const options = [
  [ShieldCheck, "Película de vidro", "Glass screen protector"],
  [Smartphone, "Película de proteção", "Protective film"],
  [Sparkles, "Outras opções disponíveis", "Other available options"],
] as const;

export default function FilmsPage() {
  const { lang } = useLanguage();
  const message = lang === "pt"
    ? "Olá MM, encontrei-vos através do website e gostaria de saber quais películas de proteção estão disponíveis."
    : "Hello MM, I found you through the website and would like to know which screen protectors are available.";

  return <>
    <section className="filmsHero"><div className="wide filmsHeroGrid">
      <div><span className="referenceBadge"><T pt="PELÍCULAS DE PROTEÇÃO" en="SCREEN PROTECTION" /></span><h1><T pt={<>Proteja o ecrã antes que<br/><em>o acidente aconteça.</em></>} en={<>Protect the screen before<br/><em>an accident happens.</em></>} /></h1><p><T pt="Aplicação profissional de películas para ajudar a proteger o seu telefone contra riscos e desgaste do dia a dia." en="Professional screen protector application to help protect your phone from scratches and everyday wear." /></p><a className="btn blue" href={whatsappUrl(message)}><MessageCircle size={17}/><T pt="Perguntar pelas películas disponíveis" en="Ask about available screen protectors" /> →</a></div>
      <div className="filmsVisual"><div className="filmGlow"/><img src="https://d2yoo3qu6vrk5d.cloudfront.net/pulzo-lite/images-resized/PP3729246-h-o.webp" alt={lang === "pt" ? "Aplicação de película num telefone" : "Applying a screen protector to a phone"}/><span><ShieldCheck size={18}/><T pt="Aplicação cuidadosa" en="Careful application" /></span></div>
    </div></section>
    <section className="filmsOptions"><div className="wide"><div className="filmsHeading"><small>MM</small><h2><T pt="Opções de proteção" en="Protection options" /></h2><p><T pt="Confirme directamente com a MM quais opções estão disponíveis para o seu modelo." en="Confirm directly with MM which options are available for your model." /></p></div><div className="filmsGrid">{options.map(([Icon, pt, en]) => <article key={pt}><Icon size={26}/><h3>{lang === "pt" ? pt : en}</h3><span><Check size={14}/><T pt="Disponibilidade sob consulta" en="Availability on request" /></span></article>)}</div><div className="filmsCta"><div><h2><T pt="Quer proteger o seu telefone?" en="Want to protect your phone?" /></h2><p><T pt="Diga-nos o modelo e verificamos as opções disponíveis." en="Tell us the model and we will check the available options." /></p></div><a className="btn blue" href={whatsappUrl(message)}><T pt="Falar com a MM" en="Talk to MM" /> →</a></div></div></section>
  </>;
}
