"use client";

import { useState } from "react";
import { ChevronRight, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { T, useLanguage } from "../../components/LanguageProvider";
import { phones, whatsappUrl } from "../../lib/phones";

const gallery = [
  ["/images/peliculas/pelicula-aplicacao-01.jpg.png", "Preparação do ecrã antes da aplicação da película", "Screen preparation before applying the screen protector"],
  ["/images/peliculas/pelicula-aplicacao-02.jpg.png", "Aplicação precisa da película no telefone", "Precise application of the screen protector to the phone"],
  ["/images/peliculas/pelicula-aplicacao-03.jpg.png", "Acabamento e remoção de bolhas da película", "Finishing and removal of bubbles from the screen protector"],
  ["/images/peliculas/pelicula-aplicacao-04.jpg.png", "Telefone com película aplicada e acabamento final", "Phone with the screen protector applied and finished"],
] as const;

const benefits = [
  ["01", "Ajuda a proteger contra riscos", "Uma camada adicional para ajudar a reduzir riscos do uso diário.", "Helps protect against scratches", "An additional layer to help reduce scratches from everyday use."],
  ["02", "Ajuda a preservar o ecrã", "Ajuda a preservar melhor a superfície do ecrã ao longo do tempo.", "Helps preserve the screen", "Helps preserve the screen surface better over time."],
  ["03", "Aplicação cuidada", "Aplicação feita com atenção à limpeza, alinhamento e acabamento.", "Careful application", "Application carried out with attention to cleaning, alignment and finishing."],
  ["04", "Compatibilidade por modelo", "Confirmamos a opção disponível de acordo com a marca e o modelo.", "Compatibility by model", "We confirm the available option according to the brand and model."],
] as const;

export default function FilmsPage() {
  const { lang } = useLanguage();
  const [formOpen, setFormOpen] = useState(false);
  const [brandChoice, setBrandChoice] = useState("");
  const [modelChoice, setModelChoice] = useState("");
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const catalogModels = brandChoice === "Apple" || brandChoice === "Samsung" ? phones.filter((phone) => phone.brand === brandChoice).map((phone) => phone.model) : [];
  const isOtherBrand = brandChoice === "Outro";
  const isOtherModel = modelChoice === "Outro modelo";
  const cleanBrand = (isOtherBrand ? customBrand : brandChoice).trim();
  const cleanModel = (isOtherBrand || isOtherModel ? customModel : modelChoice).trim();
  const ready = Boolean(cleanBrand && cleanModel);
  const changeBrand = (nextBrand: string) => {
    setBrandChoice(nextBrand);
    setModelChoice(nextBrand === "Outro" ? "Outro modelo" : "");
    setCustomBrand("");
    setCustomModel("");
  };
  const requestMessage = lang === "pt"
    ? `Olá MM, gostaria de saber quais películas estão disponíveis para o meu telefone.\n\nMarca: ${cleanBrand}\nModelo: ${cleanModel}\n\nObrigado.`
    : `Hello MM, I would like to know which screen protectors are available for my phone.\n\nBrand: ${cleanBrand}\nModel: ${cleanModel}\n\nThank you.`;
  const emailSubject = lang === "pt" ? `Consulta de película — ${cleanBrand} ${cleanModel}` : `Screen protector enquiry — ${cleanBrand} ${cleanModel}`;
  const emailUrl = `mailto:comercialmm09@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(requestMessage)}`;

  return <>
    <section className="filmsHero"><div className="wide filmsHeroGrid">
      <div><span className="referenceBadge"><T pt="PELÍCULAS LASER" en="LASER SCREEN PROTECTORS" /></span><h1><T pt={<>Proteja o ecrã antes que<br /><em>o acidente aconteça.</em></>} en={<>Protect the screen before<br /><em>an accident happens.</em></>} /></h1><h2 className="filmsLead"><T pt="Proteção reforçada com películas laser." en="Enhanced protection with laser screen protectors." /></h2><p><T pt="Maior resistência para ajudar a proteger o seu ecrã contra riscos e desgaste do dia a dia." en="Greater resistance to help protect your screen from scratches and everyday wear." /></p><p className="filmsHeroTrust"><T pt="Proteção para o dia a dia" en="Everyday protection" /><i /><T pt="Aplicação cuidadosa" en="Careful application" /><i /><T pt="Disponibilidade por modelo" en="Availability by model" /></p></div>
      <div className="filmsVisual"><div className="filmGlow" /><video autoPlay muted loop playsInline preload="metadata" poster="https://d2yoo3qu6vrk5d.cloudfront.net/pulzo-lite/images-resized/PP3729246-h-o.webp" aria-label={lang === "pt" ? "Aplicação de película num telefone" : "Applying a screen protector to a phone"}><source src="/videos/pelicula-laser-aplicacao.mp4" type="video/mp4" /></video><b className="filmBadge"><T pt="PROTEÇÃO REFORÇADA" en="ENHANCED PROTECTION" /></b><span><ShieldCheck size={18} /><T pt="Aplicação cuidadosa" en="Careful application" /></span></div>
    </div></section>
    <section className="filmsOptions"><div className="wide">
      <div className="filmsGalleryHeading"><span><T pt="PELÍCULAS LASER" en="LASER SCREEN PROTECTION" /></span><h2><T pt="Proteção aplicada com cuidado em cada detalhe." en="Protection applied with care in every detail." /></h2><p><T pt="Da preparação do ecrã ao acabamento final, cada etapa é feita com atenção para oferecer uma aplicação limpa e adequada ao seu telefone." en="From screen preparation to the final finish, every step is carried out carefully to provide a clean application suited to your phone." /></p></div>
      <div className="filmsApplicationGallery">{gallery.map(([src, pt, en], index) => <figure className={index % 2 === 0 ? "movesUp" : "movesDown"} key={src}><img src={src} width="1023" height="1537" loading="lazy" decoding="async" alt={lang === "pt" ? pt : en} /></figure>)}</div>
      <section className="filmsBenefits"><div className="filmsBenefitsIntro"><span><T pt="PORQUÊ PROTEGER O ECRÃ?" en="WHY PROTECT THE SCREEN?" /></span><h2><T pt="Mais cuidado para o telefone que usa todos os dias." en="More care for the phone you use every day." /></h2><p><T pt="Uma película cria uma camada adicional de proteção para ajudar a preservar o ecrã durante o uso diário." en="A screen protector adds an extra layer of protection to help preserve the screen during everyday use." /></p></div><div className="filmsBenefitsGrid">{benefits.map(([number, ptTitle, ptText, enTitle, enText]) => <article key={number}><b>{number}</b><h3>{lang === "pt" ? ptTitle : enTitle}</h3><p>{lang === "pt" ? ptText : enText}</p></article>)}</div></section>
      <div className={`filmsCta ${formOpen ? "isFormOpen" : ""}`}>
        <div className="filmsCtaCopy"><h2><T pt="Quer proteger o seu telefone?" en="Want to protect your phone?" /></h2><p><T pt="Diga-nos a marca e o modelo e verificamos as opções disponíveis." en="Tell us the brand and model and we will check the available options." /></p><small className="filmsCtaTime"><T pt="Leva menos de 1 minuto." en="It takes less than 1 minute." /></small></div>
        {!formOpen ? <button className="btn blue filmsFormTrigger" type="button" onClick={() => setFormOpen(true)}><T pt="Informar marca e modelo" en="Enter brand and model" /><ChevronRight size={17} /></button> : <div className="filmsRequestPanel"><div className="filmsRequestFields">
          <label htmlFor="films-brand"><T pt="Marca" en="Brand" /><select id="films-brand" value={brandChoice} onChange={(event) => changeBrand(event.target.value)}><option value=""><T pt="Selecione a marca" en="Select brand" /></option><option value="Apple">Apple</option><option value="Samsung">Samsung</option><option value="Outro"><T pt="Outro" en="Other" /></option></select></label>
          <label htmlFor="films-model"><T pt="Modelo" en="Model" /><select id="films-model" disabled={!brandChoice || isOtherBrand} value={modelChoice} onChange={(event) => { setModelChoice(event.target.value); setCustomModel(""); }}><option value=""><T pt={brandChoice ? "Selecione o modelo" : "Escolha primeiro a marca"} en={brandChoice ? "Select model" : "Choose a brand first"} /></option>{catalogModels.map((catalogModel) => <option key={catalogModel} value={catalogModel}>{catalogModel}</option>)}{brandChoice && !isOtherBrand && <option value="Outro modelo"><T pt="Outro modelo" en="Other model" /></option>}</select></label>
          {isOtherBrand && <label htmlFor="films-custom-brand"><T pt="Digite a marca" en="Enter the brand" /><input id="films-custom-brand" value={customBrand} onChange={(event) => setCustomBrand(event.target.value)} placeholder={lang === "pt" ? "Ex.: Tecno" : "E.g. Tecno"} /></label>}
          {(isOtherBrand || isOtherModel) && <label htmlFor="films-custom-model"><T pt="Digite o modelo" en="Enter the model" /><input id="films-custom-model" value={customModel} onChange={(event) => setCustomModel(event.target.value)} placeholder={lang === "pt" ? "Ex.: Camon 30" : "E.g. Camon 30"} /></label>}
        </div>{!ready ? <p className="filmsFormHelp" role="status"><T pt="Informe a marca e o modelo para continuar." en="Enter the brand and model to continue." /></p> : <div className="filmsCtaActions"><a className="btn blue" href={whatsappUrl(requestMessage)}><MessageCircle size={17} /><T pt="Enviar por WhatsApp" en="Send via WhatsApp" /></a><a className="btn filmsEmailCta" href={emailUrl}><Mail size={16} /><T pt="Enviar por e-mail" en="Send by email" /></a></div>}</div>}
      </div>
    </div></section>
  </>;
}
