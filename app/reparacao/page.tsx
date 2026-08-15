"use client";

import { FormEvent, useEffect, useState } from "react";
import { BatteryCharging, Camera, ChevronRight, Heart, Mail, MonitorSmartphone, PlugZap, Power, Settings, Smartphone } from "lucide-react";
import { T, useLanguage } from "../../components/LanguageProvider";
import { whatsappUrl } from "../../lib/phones";

const issues = [
  { icon: MonitorSmartphone, pt: "Ecrã partido", en: "Broken screen", descPt: "Ecrã rachado, sem imagem ou touch com problemas.", descEn: "Cracked screen, no image or touch problems." },
  { icon: BatteryCharging, pt: "Bateria descarrega rápido", en: "Battery drains quickly", descPt: "Autonomia reduzida ou bateria a descarregar rapidamente.", descEn: "Reduced autonomy or a battery that drains quickly." },
  { icon: PlugZap, pt: "Telefone não carrega", en: "Phone does not charge", descPt: "Falha no carregamento, entrada ou ligação de energia.", descEn: "Charging, port or power connection failure." },
  { icon: Power, pt: "Telefone não liga", en: "Phone does not turn on", descPt: "O aparelho não inicia ou deixou de responder.", descEn: "The device does not start or has stopped responding." },
  { icon: Settings, pt: "Problemas de software", en: "Software issues", descPt: "Lentidão, bloqueios, erros ou problemas no sistema.", descEn: "Slowness, crashes, errors or system problems." },
  { icon: Camera, pt: "Câmara ou som", en: "Camera or sound", descPt: "Problemas na câmara, microfone, altifalante ou áudio.", descEn: "Camera, microphone, speaker or audio problems." },
  { icon: Smartphone, pt: "Outro problema", en: "Other issue", descPt: "Conte-nos o que está a acontecer com o aparelho.", descEn: "Tell us what is happening with the device." },
];

const popular = [
  { icon: MonitorSmartphone, pt: "Substituição de ecrã", en: "Screen replacement", issuePt: "Ecrã partido", issueEn: "Broken screen" },
  { icon: BatteryCharging, pt: "Troca de bateria", en: "Battery replacement", issuePt: "Bateria descarrega rápido", issueEn: "Battery drains quickly" },
  { icon: PlugZap, pt: "Problemas de carregamento", en: "Charging problems", issuePt: "Telefone não carrega", issueEn: "Phone does not charge" },
  { icon: Camera, pt: "Câmara", en: "Camera", issuePt: "Câmara ou som", issueEn: "Camera or sound" },
  { icon: Smartphone, pt: "Som e microfone", en: "Sound and microphone", issuePt: "Câmara ou som", issueEn: "Camera or sound" },
  { icon: Settings, pt: "Software", en: "Software", issuePt: "Problemas de software", issueEn: "Software issues" },
];

const repairHeroImages = [7, 1, 10, 4, 5, 2, 6, 3, 8, 9].map((number, index) => ({
  src: `/images/reparacao/tecnico-reparando-telefone (${number}).jpg`,
  position: ["center 48%", "center 58%", "center 48%", "center", "center", "center 56%", "center 58%", "center", "center 48%", "center 48%"][index],
}));

function RepairHeroGallery() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const next = (active + 1) % repairHeroImages.length;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      if (fading) { setActive(next); setFading(false); }
      else setFading(true);
    }, fading ? 1000 : 6000);
    return () => window.clearTimeout(timer);
  }, [active, fading, next]);
  const currentImage = repairHeroImages[active];
  const nextImage = repairHeroImages[next];
  return <div className="repairHeroPhoto">
    <img className={`repairHeroSlide repairHeroSlideNext motion${next % 3}`} src={nextImage.src} style={{ objectPosition: nextImage.position }} alt="" loading="eager"/>
    <img className={`repairHeroSlide repairHeroSlideCurrent motion${active % 3}${fading ? " fading" : ""}`} src={currentImage.src} style={{ objectPosition: currentImage.position }} alt="" fetchPriority={active === 0 ? "high" : "auto"}/>
    <div className="repairStatus"><small><T pt="CUIDADO TÉCNICO" en="TECHNICAL CARE" /></small><b><T pt="Cada aparelho importa" en="Every device matters" /></b></div>
  </div>;
}

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
      ? `Olá MM, encontrei-vos através do website. O problema selecionado é: ${form.problem}. Gostaria de saber sobre a reparação do meu telefone.\n\nNome: ${form.name}\nWhatsApp: ${form.phone}\nMarca: ${form.brand}\nModelo: ${form.model}\nDescrição: ${form.description}`
      : `Hello MM, I found you through the website. The selected issue is: ${form.problem}. I would like to ask about repairing my phone.\n\nName: ${form.name}\nWhatsApp: ${form.phone}\nBrand: ${form.brand}\nModel: ${form.model}\nDescription: ${form.description}`;
    window.location.href = whatsappUrl(message);
  }

  function requestEmail() {
    const formElement = document.getElementById("repair-request-form") as HTMLFormElement | null;
    if (!formElement?.reportValidity()) return;
    const subject = lang === "pt" ? `Pedido de reparação — ${form.brand} ${form.model}` : `Repair request — ${form.brand} ${form.model}`;
    const body = lang === "pt"
      ? `Olá MM, gostaria de solicitar uma reparação.\n\nNome: ${form.name}\nWhatsApp: ${form.phone}\nMarca: ${form.brand}\nModelo: ${form.model}\nProblema: ${form.problem}\nDescrição: ${form.description}`
      : `Hello MM, I would like to request a repair.\n\nName: ${form.name}\nWhatsApp: ${form.phone}\nBrand: ${form.brand}\nModel: ${form.model}\nIssue: ${form.problem}\nDescription: ${form.description}`;
    window.location.href = `mailto:comercialmm09@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return <main className="repairPage">
    <section className="repairPremiumHero"><div className="wide repairHeroGrid"><div className="repairHeroCopy"><span className="kicker"><i/> <T pt="REPARAÇÃO DE TELEFONES" en="PHONE REPAIR" /></span><h1><T pt={<>O seu telefone parou.<br/><em>A sua vida não precisa parar.</em></>} en={<>Your phone stopped.<br/><em>Your life doesn&apos;t have to.</em></>} /></h1><p><T pt="Ecrã, bateria, carregamento, software ou outro problema? Conte-nos o que aconteceu e ajudamos a identificar o próximo passo." en="Screen, battery, charging, software or another problem? Tell us what happened and we will help identify the next step." /></p><button className="btn blue" onClick={() => document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" })}><T pt="Quero reparar o meu telefone" en="I want to repair my phone" /> <ChevronRight size={16}/></button></div><RepairHeroGallery/></div></section>

    <section className="repairIssueSection"><div className="wide"><div className="sectionIntro"><span className="kicker"><i/> <T pt="ESCOLHA O PROBLEMA" en="CHOOSE THE ISSUE" /></span><div><h2><T pt="O que aconteceu com o seu telefone?" en="What happened to your phone?" /></h2><p><T pt="Selecione uma opção para iniciar o pedido de assistência." en="Select an option to start your assistance request." /></p></div></div><div className="serviceGrid interactiveIssues">{issues.map((issue) => {const Icon=issue.icon; return <button onClick={() => choose(lang === "pt" ? issue.pt : issue.en)} key={issue.pt}><span><Icon size={22}/></span><h3>{lang === "pt" ? issue.pt : issue.en}</h3><p>{lang === "pt" ? issue.descPt : issue.descEn}</p><i><ChevronRight size={15}/></i></button>})}</div></div></section>

    <section className="popularRepairs"><div className="wide"><div className="sectionIntro"><span className="kicker"><i/> <T pt="SERVIÇOS FREQUENTES" en="COMMON SERVICES" /></span><div><h2><T pt="Reparações mais procuradas" en="Most requested repairs" /></h2><p><T pt="Soluções técnicas para os problemas mais comuns, sempre após avaliação do aparelho." en="Technical solutions for common problems, always after assessing the device." /></p></div></div><div className="popularRepairGrid">{popular.map(item=>{const Icon=item.icon;return <button key={item.pt} onClick={()=>choose(lang==="pt"?item.issuePt:item.issueEn)}><Icon size={25}/><b>{lang==="pt"?item.pt:item.en}</b><span><T pt="Pedir diagnóstico" en="Request diagnosis" /> <ChevronRight size={14}/></span></button>})}</div></div></section>

    <section className="processSection"><div className="wide"><span className="kicker"><i/> <T pt="DO PROBLEMA À SOLUÇÃO" en="FROM PROBLEM TO SOLUTION" /></span><h2><T pt="Um processo claro, sem promessas antes do diagnóstico." en="A clear process, with no promises before diagnosis." /></h2><div className="processGrid">{[["01", "Conte-nos o que aconteceu.", "Tell us what happened."], ["02", "Avaliamos o aparelho.", "We assess the device."], ["03", "Explicamos a solução e o orçamento.", "We explain the solution and quote."], ["04", "Após autorização, fazemos a reparação.", "After approval, we carry out the repair."]].map((step) => <div key={step[0]}><b>{step[0]}</b><h3>{lang === "pt" ? step[1] : step[2]}</h3></div>)}</div></div></section>

    <section className="repairCare"><div className="wide repairCareGrid"><div className="repairCarePhoto"><img src="/images/reparacao/tecnico-reparando-telefone (6).jpg" alt=""/></div><div><span className="kicker"><Heart size={14}/> <T pt="CUIDADO COM O QUE IMPORTA" en="CARE FOR WHAT MATTERS" /></span><h2><T pt="O seu telefone guarda mais do que dados." en="Your phone holds more than data." /></h2><p><T pt="Fotografias, contactos, conversas, trabalho e momentos importantes fazem parte do aparelho que usa todos os dias. Por isso, cada reparação merece atenção e cuidado." en="Photos, contacts, conversations, work and important moments are part of the device you use every day. That is why every repair deserves attention and care." /></p></div></div></section>

    <section className="diagnosticForm" id="diagnostico"><div className="wide formGrid"><div><h2><T pt={<>Conte-nos o problema.<br/><em>Nós ouvimos.</em></>} en={<>Tell us the problem.<br/><em>We listen.</em></>} /></h2><p><T pt="Preencha os dados e escolha como prefere enviar o pedido para nossa equipe." en="Complete the details and choose how you prefer to send the request to our team." /></p></div><form id="repair-request-form" onSubmit={submit}><label><T pt="Nome" en="Name"/><input required value={form.name} onChange={field("name")}/></label><label>WhatsApp<input required type="tel" value={form.phone} onChange={field("phone")}/></label><label><T pt="Marca" en="Brand"/><input required value={form.brand} onChange={field("brand")}/></label><label><T pt="Modelo" en="Model"/><input required value={form.model} onChange={field("model")}/></label><label className="wideField"><T pt="Problema" en="Issue"/><select required value={form.problem} onChange={field("problem")}><option value=""><T pt="Selecione" en="Select"/></option>{issues.map((issue) => <option key={issue.pt} value={lang === "pt" ? issue.pt : issue.en}>{lang === "pt" ? issue.pt : issue.en}</option>)}</select></label><label className="wideField"><T pt="Descrição" en="Description"/><textarea rows={4} value={form.description} onChange={field("description")}/></label><div className="repairFormActions"><button className="btn blue" type="submit"><T pt="Solicitar por WhatsApp" en="Request via WhatsApp"/> <ChevronRight size={16}/></button><button className="btn repairEmailButton" type="button" onClick={requestEmail}><Mail size={16}/><T pt="Solicitar por e-mail" en="Request by email"/></button></div></form></div></section>
  </main>;
}
