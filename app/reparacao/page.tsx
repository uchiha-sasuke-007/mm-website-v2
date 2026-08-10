"use client";

import { FormEvent, useEffect, useState } from "react";
import { T, useLanguage } from "../../components/LanguageProvider";
import { whatsappUrl } from "../../lib/phones";

const issues = [
  { i: "▱", pt: "Ecrã partido", en: "Broken screen" },
  { i: "◒", pt: "Bateria descarrega rápido", en: "Battery drains quickly" },
  { i: "⌁", pt: "Telefone não carrega", en: "Phone does not charge" },
  { i: "○", pt: "Telefone não liga", en: "Phone does not turn on" },
  { i: "⌘", pt: "Problemas de software", en: "Software issues" },
  { i: "◉", pt: "Câmara ou som", en: "Camera or sound" },
  { i: "+", pt: "Outro problema", en: "Other issue" },
];

export default function RepairPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", brand: "", model: "", problem: "", description: "" });
  const field = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [key]: event.target.value });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const selected = new URLSearchParams(window.location.search).get("problema");
      if (selected && issues.some((issue) => issue.pt === selected)) {
        setForm((current) => ({ ...current, problem: selected }));
        document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function choose(problem: string) {
    setForm({ ...form, problem });
    document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const message = lang === "pt"
      ? `Olá MM, encontrei-vos através do website. O problema seleccionado é: ${form.problem}. Gostaria de saber sobre a reparação do meu telefone.\n\nNome: ${form.name}\nWhatsApp: ${form.phone}\nMarca: ${form.brand}\nModelo: ${form.model}\nDescrição: ${form.description}`
      : `Hello MM, I found you through the website. The selected issue is: ${form.problem}. I would like to ask about repairing my phone.\n\nName: ${form.name}\nWhatsApp: ${form.phone}\nBrand: ${form.brand}\nModel: ${form.model}\nDescription: ${form.description}`;
    window.location.href = whatsappUrl(message);
  }

  return <>
    <section className="pageHero repairHero"><div className="wide split"><div><span className="kicker"><i/> <T pt="REPARAÇÃO DE TELEFONES" en="PHONE REPAIR" /></span><h1><T pt={<>O seu telefone parou.<br/><em>A sua vida não precisa parar.</em></>} en={<>Your phone stopped.<br/><em>Your life doesn't have to.</em></>} /></h1><p><T pt="Conte-nos o problema e deixe a MM ajudar a identificar o próximo passo." en="Tell us the issue and let MM help identify the next step." /></p><button className="btn blue" onClick={() => document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" })}><T pt="Quero reparar o meu telefone" en="I want to repair my phone" /> ↓</button></div><div className="repairHeroVisual"><div className="diagnosticRing"/><div className="repairPhone"><span>MM</span><i/></div><div className="statusCard"><small><T pt="CUIDADO" en="CARE" /></small><b><T pt="Cada aparelho importa" en="Every device matters" /></b></div></div></div></section>

    <section className="lightSection services"><div className="wide"><div className="sectionIntro"><span className="kicker"><i/> <T pt="ESCOLHA O PROBLEMA" en="CHOOSE THE ISSUE" /></span><div><h2><T pt="O que aconteceu com o seu telefone?" en="What happened to your phone?" /></h2><p><T pt="Seleccione uma opção para iniciar o pedido de assistência." en="Select an option to start your assistance request." /></p></div></div><div className="serviceGrid interactiveIssues">{issues.map((issue) => <button onClick={() => choose(lang === "pt" ? issue.pt : issue.en)} key={issue.pt}><span>{issue.i}</span><h3>{lang === "pt" ? issue.pt : issue.en}</h3><i>→</i></button>)}</div></div></section>

    <section className="darkSection processSection"><div className="wide"><span className="kicker"><i/> <T pt="DO PROBLEMA À SOLUÇÃO" en="FROM PROBLEM TO SOLUTION" /></span><h2><T pt="Um processo claro, sem promessas antes do diagnóstico." en="A clear process, with no promises before diagnosis." /></h2><div className="processGrid">{[["01", "Conte-nos o que aconteceu.", "Tell us what happened."], ["02", "Avaliamos o aparelho.", "We assess the device."], ["03", "Explicamos a solução e o orçamento.", "We explain the solution and quote."], ["04", "Após autorização, fazemos a reparação.", "After approval, we carry out the repair."]].map((step) => <div key={step[0]}><b>{step[0]}</b><h3>{lang === "pt" ? step[1] : step[2]}</h3></div>)}</div></div></section>

    <section className="humanRepair"><div className="wide"><span>♡</span><div><small><T pt="CUIDADO COM O QUE IMPORTA" en="CARE FOR WHAT MATTERS" /></small><h2><T pt="Um telefone guarda muito mais do que aplicações." en="A phone holds much more than apps." /></h2><p><T pt="Fotografias, contactos, conversas, trabalho e momentos importantes fazem parte do aparelho que usa todos os dias. Por isso, cada reparação merece atenção e cuidado." en="Photos, contacts, conversations, work and important moments are part of the device you use every day. That is why every repair deserves attention and care." /></p></div></div></section>

    <section className="lightSection diagnosticForm" id="diagnostico"><div className="wide formGrid"><div><span className="kicker"><i/> WhatsApp</span><h2><T pt={<>Conte-nos o problema.<br/><em>Nós ouvimos.</em></>} en={<>Tell us the problem.<br/><em>We listen.</em></>} /></h2><p><T pt="Preencha os dados e confirme a mensagem no WhatsApp." en="Complete the details and confirm the message on WhatsApp." /></p></div><form onSubmit={submit}><label><T pt="Nome" en="Name"/><input required value={form.name} onChange={field("name")}/></label><label>WhatsApp<input required type="tel" value={form.phone} onChange={field("phone")}/></label><label><T pt="Marca" en="Brand"/><input required value={form.brand} onChange={field("brand")}/></label><label><T pt="Modelo" en="Model"/><input required value={form.model} onChange={field("model")}/></label><label className="wideField"><T pt="Problema" en="Issue"/><select required value={form.problem} onChange={field("problem")}><option value=""><T pt="Seleccione" en="Select"/></option>{issues.map((issue) => <option key={issue.pt} value={lang === "pt" ? issue.pt : issue.en}>{lang === "pt" ? issue.pt : issue.en}</option>)}</select></label><label className="wideField"><T pt="Descrição" en="Description"/><textarea rows={4} value={form.description} onChange={field("description")}/></label><button className="btn blue" type="submit"><T pt="Enviar pelo WhatsApp" en="Send via WhatsApp"/> ↗</button></form></div></section>
  </>;
}
