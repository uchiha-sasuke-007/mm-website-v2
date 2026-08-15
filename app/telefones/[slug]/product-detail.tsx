"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, MessageCircle, X } from "lucide-react";
import { T, useLanguage } from "../../../components/LanguageProvider";
import type { Phone } from "../../../lib/phones";
import { whatsappUrl } from "../../../lib/phones";

type EmailForm = { name:string; company:string; email:string; phone:string; quantity:string; message:string };

export default function ProductDetail({ phone }: { phone: Phone }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const [storage, setStorage] = useState("");
  const [color, setColor] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [form, setForm] = useState<EmailForm>({name:"",company:"",email:"",phone:"",quantity:"1",message:""});
  const ready = Boolean(storage && color);
  const selectedColor = phone.colorOptions.find(option=>option.en===color);
  const localizedColor = selectedColor ? (lang === "pt" ? selectedColor.pt : selectedColor.en) : "";
  const quantity = Math.max(1, Number.parseInt(form.quantity || "1", 10) || 1);

  useEffect(()=>{if(new URLSearchParams(window.location.search).get("acao")==="email")document.querySelector(".buyPanel")?.scrollIntoView({behavior:"smooth"})},[]);

  const whatsappMessage = lang === "pt"
    ? `Olá MM, tenho interesse no ${phone.brand} ${phone.model}. Armazenamento: ${storage}. Cor: ${localizedColor}. Gostaria de confirmar preço e disponibilidade.`
    : `Hello MM, I am interested in the ${phone.brand} ${phone.model}. Storage: ${storage}. Colour: ${localizedColor}. I would like to confirm price and availability.`;

  function openEmail(){if(!ready)return;setStatus("idle");setEmailOpen(true)}
  function goBack(){
    const previous = document.referrer;
    if(previous && new URL(previous).origin === window.location.origin) router.back();
    else router.push("/telefones");
  }
  function field(key:keyof EmailForm){return(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>setForm(current=>({...current,[key]:event.target.value}))}
  async function submit(event:FormEvent){event.preventDefault();setStatus("sending");try{const response=await fetch("/api/commercial-request",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...form,quantity,brand:phone.brand,model:phone.model,condition:phone.condition,storage,color,lang})});if(!response.ok)throw new Error("send failed");setStatus("success")}catch{setStatus("error")}}

  return <>
    <section className="productPage"><div className="wide">
      <div className="productBreadcrumb"><Link href="/">MM</Link><span>/</span><Link href="/telefones"><T pt="Telefones" en="Phones" /></Link><span>/</span><b>{phone.model}</b></div>
      <div className="productLayout">
        <div className="productGallery"><div className="galleryMain"><span>{phone.available?(lang==="pt"?"Disponível":"Available"):(lang==="pt"?"Sob consulta":"Ask us")}</span><img src={phone.image} alt={phone.model}/></div></div>
        <div className="buyPanel"><small className="productBrand">{phone.brand}</small><h1>{phone.model}</h1><div className="conditionPill">{phone.condition==="Novo"?(lang==="pt"?"Novo":"New"):phone.condition==="Seminovo"?(lang==="pt"?"Seminovo":"Pre-owned"):(lang==="pt"?"Sob consulta":"On request")}</div><p>{lang==="pt"?phone.description:phone.descriptionEn}</p>
          <fieldset className="productOptions"><legend><T pt="Armazenamento" en="Storage" /> *</legend><div className="productOptionList">{phone.storageOptions.map(option=><button type="button" className={storage===option?"active":""} aria-pressed={storage===option} onClick={()=>setStorage(option)} key={option}>{option}</button>)}</div></fieldset>
          <fieldset className="productOptions"><legend><T pt="Cor" en="Colour" /> *</legend><div className="productOptionList colorOptionList">{phone.colorOptions.map(option=>{const label=lang==="pt"?option.pt:option.en;return <button type="button" className={color===option.en?"active":""} aria-pressed={color===option.en} onClick={()=>setColor(option.en)} key={option.en}><i style={{backgroundColor:option.hex}} aria-hidden="true"/>{label}</button>})}</div></fieldset>
          <div className="buyPrice"><strong>{lang==="pt"?phone.price:"Check price"}</strong><span><T pt="Preço e disponibilidade sob consulta." en="Price and availability on request." /></span></div>
          {!ready&&<p className="selectionNotice"><T pt="Selecione a cor e o armazenamento para continuar." en="Select colour and storage to continue." /></p>}
          <div className="commercialActions"><a aria-disabled={!ready} className={`btn buyWhatsapp ${!ready?"disabled":""}`} href={ready?whatsappUrl(whatsappMessage):undefined}><MessageCircle size={17}/><T pt="Consultar por WhatsApp" en="Enquire on WhatsApp" /></a><button disabled={!ready} className="btn emailRequestButton" onClick={openEmail}><Mail size={17}/><T pt="Solicitar por e-mail" en="Request by email" /></button></div>
          <button type="button" className="backButton detailBackButton" onClick={goBack}><ArrowLeft size={14}/><T pt="Voltar para telefones" en="Back to phones" /></button>
        </div>
      </div>
    </div></section>
    <section className="productDetails"><div className="wide"><div className="detailsTabs"><b><T pt="Sobre este telefone" en="About this phone" /></b><span><T pt="Características" en="Features" /></span><span><T pt="Informações importantes" en="Important information" /></span></div><div className="detailContent"><article><h2><T pt="Descrição" en="Description" /></h2><p>{lang==="pt"?phone.description:phone.descriptionEn}</p></article><article><h2><T pt="Características principais" en="Key features" /></h2>{(lang==="pt"?phone.features:phone.featuresEn).map(feature=><span key={feature}>• {feature}</span>)}</article><article><h2><T pt="Condição e disponibilidade" en="Condition and availability" /></h2><p><T pt="As informações de preço e disponibilidade devem ser confirmadas diretamente com a MM antes da compra." en="Price and availability information must be confirmed directly with MM before purchase." /></p></article></div></div></section>
    {emailOpen&&<div className="emailModalBackdrop" role="presentation"><section className="emailModal" role="dialog" aria-modal="true" aria-labelledby="email-request-title"><button className="emailModalClose" onClick={()=>setEmailOpen(false)} aria-label={lang==="pt"?"Fechar formulário":"Close form"}><X size={20}/></button>{status==="success"?<div className="emailFeedback success"><Mail size={32}/><h2><T pt="Pedido enviado com sucesso." en="Request sent successfully." /></h2><p><T pt="Recebemos o seu pedido e a equipa da MM entrará em contacto." en="We received your request and the MM team will get in touch." /></p><button className="btn blue" onClick={()=>setEmailOpen(false)}><T pt="Fechar" en="Close" /></button></div>:<><small>MM · <T pt="PEDIDO COMERCIAL" en="COMMERCIAL REQUEST" /></small><h2 id="email-request-title"><T pt="Solicitar por e-mail" en="Request by email" /></h2><div className="selectedProductSummary"><b><T pt="Produto selecionado" en="Selected product" /></b><strong>{phone.brand} {phone.model}</strong><span><T pt="Armazenamento" en="Storage" />: {storage}</span><span><T pt="Cor" en="Colour" />: {localizedColor}</span><span><T pt="Quantidade" en="Quantity" />: {quantity}</span></div><form onSubmit={submit}><label><T pt="Nome" en="Name" /> *<input required value={form.name} onChange={field("name")}/></label><label><T pt="Empresa" en="Company" /><input value={form.company} onChange={field("company")}/></label><label><T pt="E-mail" en="Email" /> *<input required type="email" value={form.email} onChange={field("email")}/></label><label><T pt="Telefone" en="Phone" /><input type="tel" value={form.phone} onChange={field("phone")}/></label><label><T pt="Quantidade" en="Quantity" /><input min="1" type="number" value={form.quantity} onChange={field("quantity")}/></label><label className="emailMessage"><T pt="Mensagem" en="Message" /><textarea rows={4} value={form.message} onChange={field("message")}/></label>{status==="error"&&<p className="emailError"><T pt="Não foi possível enviar o pedido. Tente novamente ou fale connosco pelo WhatsApp." en="We could not send the request. Please try again or contact us on WhatsApp." /></p>}<button className="btn blue" disabled={status==="sending"} type="submit">{status==="sending"?<T pt="A enviar…" en="Sending…" />:<T pt="Enviar pedido" en="Send request" />}</button></form></>}</section></div>}
  </>;
}



