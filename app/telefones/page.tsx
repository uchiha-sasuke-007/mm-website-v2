"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Mail, MessageCircle, Search } from "lucide-react";
import { phones, whatsappUrl } from "../../lib/phones";
import { T, useLanguage } from "../../components/LanguageProvider";

const PAGE_SIZE = 12;
const unique = (values:string[]) => [...new Set(values)];
const storageSize = (value:string) => {
  const amount = Number.parseFloat(value);
  return value.toUpperCase().includes("TB") ? amount * 1024 : amount;
};

export default function PhonesPage(){
  const {lang}=useLanguage();
  const [brand,setBrand]=useState("Todos");
  const [condition,setCondition]=useState("Todos");
  const [storage,setStorage]=useState("Todos");
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("featured");
  const [limit,setLimit]=useState(PAGE_SIZE);
  const [requestOpen,setRequestOpen]=useState(false);
  const [requestBrand,setRequestBrand]=useState("");
  const [requestModel,setRequestModel]=useState("");
  const [customBrand,setCustomBrand]=useState("");
  const [customModel,setCustomModel]=useState("");
  const brands=useMemo(()=>["Todos",...unique(phones.map(phone=>phone.brand))],[]);
  const conditions=useMemo(()=>["Todos",...unique(phones.map(phone=>phone.condition))],[]);
  const storages=useMemo(()=>["Todos",...unique(phones.flatMap(phone=>phone.storageOptions)).filter(value=>value!=="A confirmar").sort((a,b)=>storageSize(a)-storageSize(b))],[]);

  useEffect(()=>{const timer=window.setTimeout(()=>{const value=new URLSearchParams(window.location.search).get("marca");if(value&&brands.includes(value)){setBrand(value);setLimit(PAGE_SIZE)}},0);return()=>window.clearTimeout(timer)},[brands]);

  const visible=useMemo(()=>phones.filter(p=>(brand==="Todos"||p.brand===brand)&&(condition==="Todos"||p.condition===condition)&&(storage==="Todos"||p.storageOptions.includes(storage))&&`${p.brand} ${p.model}`.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sort==="brand"?a.brand.localeCompare(b.brand):sort==="condition"?a.condition.localeCompare(b.condition):0),[brand,condition,storage,search,sort]);
  const shown=visible.slice(0,limit);
  const clear=()=>{setBrand("Todos");setCondition("Todos");setStorage("Todos");setSearch("");setLimit(PAGE_SIZE)};
  const requestBrands=useMemo(()=>unique(phones.map(phone=>phone.brand)),[]);
  const requestModels=useMemo(()=>requestBrand&&requestBrand!=="Outro"?unique(phones.filter(phone=>phone.brand===requestBrand).map(phone=>phone.model)):[],[requestBrand]);
  const otherBrand=requestBrand==="Outro";
  const otherModel=requestModel==="Outro modelo";
  const cleanRequestBrand=(otherBrand?customBrand:requestBrand).trim();
  const cleanRequestModel=(otherBrand||otherModel?customModel:requestModel).trim();
  const requestReady=Boolean(cleanRequestBrand&&cleanRequestModel);
  const changeRequestBrand=(value:string)=>{setRequestBrand(value);setRequestModel(value==="Outro"?"Outro modelo":"");setCustomBrand("");setCustomModel("")};
  const requestMessage=lang==="pt"?`Olá MM, encontrei-vos através do website e estou à procura de um telefone que não encontrei no catálogo.\n\nMarca: ${cleanRequestBrand}\nModelo: ${cleanRequestModel}\n\nGostaria de saber se têm este modelo disponível ou se conseguem verificar uma opção semelhante.`:`Hello MM, I found you through the website and I am looking for a phone that I could not find in the catalogue.\n\nBrand: ${cleanRequestBrand}\nModel: ${cleanRequestModel}\n\nI would like to know whether this model is available or if you can check a similar option.`;
  const requestSubject=lang==="pt"?`Consulta de disponibilidade — ${cleanRequestBrand} ${cleanRequestModel}`:`Availability enquiry — ${cleanRequestBrand} ${cleanRequestModel}`;
  const requestEmailBody=lang==="pt"?`Olá equipa da MM,\n\nEncontrei o website e gostaria de consultar a disponibilidade de um telefone.\n\nMarca: ${cleanRequestBrand}\nModelo: ${cleanRequestModel}\n\nGostaria de saber se este modelo está disponível ou se existe uma opção semelhante.\n\nObrigado.`:`Hello MM team,\n\nI found the website and would like to enquire about phone availability.\n\nBrand: ${cleanRequestBrand}\nModel: ${cleanRequestModel}\n\nI would like to know whether this model is available or if there is a similar option.\n\nThank you.`;
  const requestEmail=`mailto:comercialmm09@gmail.com?subject=${encodeURIComponent(requestSubject)}&body=${encodeURIComponent(requestEmailBody)}`;

  return <>
    <section className="catalogHero"><div className="wide"><div><span className="shopBadge"><T pt="VENDA DE TELEFONES" en="PHONE SALES" /></span><h1><T pt={<>Encontre o telefone<br/><em>certo para si.</em></>} en={<>Find the right phone<br/><em>for you.</em></>} /></h1><p><T pt="Modelos para diferentes necessidades, estilos e orçamentos." en="Models for different needs, styles and budgets." /></p></div><div className="catalogHeroVideo" aria-hidden="true"><img className="catalogHeroVideoFallback" src={phones[1].image} alt=""/><video autoPlay loop muted playsInline preload="metadata"><source src="/videos/phones-hero.mp4" type="video/mp4"/></video></div></div></section>
    <section className="shopCatalog"><div className="wide"><div className="catalogToolbar"><label className="productSearch"><Search size={16}/><input value={search} onChange={e=>{setSearch(e.target.value);setLimit(PAGE_SIZE)}} placeholder={lang==="pt"?"Pesquisar marca ou modelo":"Search brand or model"}/></label><div className="resultCount"><b>{visible.length}</b> <T pt="telefones encontrados" en="phones found" /></div><label className="sortSelect"><T pt="Ordenar:" en="Sort:" /><select value={sort} onChange={e=>{setSort(e.target.value);setLimit(PAGE_SIZE)}}><option value="featured"><T pt="Destaques" en="Featured" /></option><option value="brand"><T pt="Marca" en="Brand" /></option><option value="condition"><T pt="Condição" en="Condition" /></option></select></label></div>
      <div className="catalogLayout"><aside className="filterPanel"><div className="filterTitle"><b><T pt="Filtros" en="Filters" /></b><button onClick={clear}><T pt="Limpar" en="Clear" /></button></div><Filter title={lang==="pt"?"Marca":"Brand"} values={brands} active={brand} set={value=>{setBrand(value);setLimit(PAGE_SIZE)}} lang={lang}/><Filter title={lang==="pt"?"Condição":"Condition"} values={conditions} active={condition} set={value=>{setCondition(value);setLimit(PAGE_SIZE)}} lang={lang}/><Filter title={lang==="pt"?"Armazenamento":"Storage"} values={storages} active={storage} set={value=>{setStorage(value);setLimit(PAGE_SIZE)}} lang={lang}/></aside>
        <div><div className="shopGrid">{shown.map(p=><Link className="storeProduct catalogProduct catalogProductLink" href={`/telefones/${p.slug}`} aria-label={lang==="pt"?`Ver ${p.brand} ${p.model}`:`View ${p.brand} ${p.model}`} key={p.slug}><div className="storeProductImage">{p.condition!=="Sob consulta"&&<span>{p.available?(lang==="pt"?"Disponível":"Available"):p.condition}</span>}<img src={p.image} alt={p.model}/></div><div className="storeProductBody"><small>{p.brand}</small><h2>{p.model}</h2>{p.storage!=="A confirmar"&&<div className="productMeta"><span>{p.storage}</span></div>}<strong>{lang==="pt"?p.price:"Check price"}</strong></div></Link>)}{!visible.length&&<div className="emptyShop"><Search size={22}/><b><T pt="Nenhum telefone encontrado" en="No phones found" /></b><p><T pt="Experimente remover alguns filtros." en="Try removing some filters." /></p><button className="btn soft" onClick={clear}><T pt="Limpar filtros" en="Clear filters" /></button></div>}</div>{limit<visible.length&&<div className="loadMoreWrap"><button className="loadMorePhones" type="button" onClick={()=>setLimit(current=>current+PAGE_SIZE)}><T pt="Mostrar mais telefones" en="Show more phones" /></button></div>}</div>
      </div><div className={`catalogAsk catalogRequest ${requestOpen?"isOpen":""}`}><div className="catalogRequestCopy"><h2><T pt="Não encontrou o modelo que procura?" en="Didn't find the model you're looking for?" /></h2><p><T pt="Diga-nos a marca e o modelo. A equipa da MM pode verificar outras opções e disponibilidade para si." en="Tell us the brand and model. The MM team can check other options and availability for you." /></p><small><T pt="Leva menos de 1 minuto." en="It takes less than 1 minute." /></small></div>{!requestOpen?<button className="btn blue catalogRequestTrigger" type="button" onClick={()=>setRequestOpen(true)}><T pt="Informar marca e modelo" en="Enter brand and model" /><ChevronRight size={17}/></button>:<div className="catalogRequestPanel"><div className="catalogRequestFields"><label htmlFor="catalog-request-brand"><T pt="Marca" en="Brand" /><select id="catalog-request-brand" value={requestBrand} onChange={event=>changeRequestBrand(event.target.value)}><option value=""><T pt="Selecione a marca" en="Select brand" /></option>{requestBrands.map(item=><option key={item} value={item}>{item}</option>)}<option value="Outro"><T pt="Outro" en="Other" /></option></select></label><label htmlFor="catalog-request-model"><T pt="Modelo" en="Model" /><select id="catalog-request-model" disabled={!requestBrand||otherBrand} value={requestModel} onChange={event=>{setRequestModel(event.target.value);setCustomModel("")}}><option value=""><T pt={requestBrand?"Selecione o modelo":"Escolha primeiro a marca"} en={requestBrand?"Select model":"Choose a brand first"}/></option>{requestModels.map(item=><option key={item} value={item}>{item}</option>)}{requestBrand&&!otherBrand&&<option value="Outro modelo"><T pt="Outro modelo" en="Other model" /></option>}</select></label>{otherBrand&&<label htmlFor="catalog-custom-brand"><T pt="Digite a marca" en="Enter the brand" /><input id="catalog-custom-brand" value={customBrand} onChange={event=>setCustomBrand(event.target.value)} placeholder={lang==="pt"?"Ex.: Tecno":"E.g. Tecno"}/></label>}{(otherBrand||otherModel)&&<label htmlFor="catalog-custom-model"><T pt="Digite o modelo" en="Enter the model" /><input id="catalog-custom-model" value={customModel} onChange={event=>setCustomModel(event.target.value)} placeholder={lang==="pt"?"Ex.: Camon 30":"E.g. Camon 30"}/></label>}</div>{!requestReady?<p className="catalogRequestHelp" role="status"><T pt="Informe a marca e o modelo para continuar." en="Enter the brand and model to continue." /></p>:<div className="catalogRequestActions"><a className="btn blue" href={whatsappUrl(requestMessage)}><MessageCircle size={17}/><T pt="Enviar por WhatsApp" en="Send via WhatsApp" /></a><a className="btn catalogRequestEmail" href={requestEmail}><Mail size={16}/><T pt="Enviar por e-mail" en="Send by email" /></a></div>}</div>}</div></div></section>
  </>;
}

function Filter({title,values,active,set,lang}:{title:string;values:string[];active:string;set:(v:string)=>void;lang:"pt"|"en"}){const label=(v:string)=>v==="Todos"?(lang==="pt"?"Todos":"All"):v==="Novo"?(lang==="pt"?"Novos":"New"):v==="Seminovo"?(lang==="pt"?"Seminovos":"Pre-owned"):v==="Sob consulta"?(lang==="pt"?"Sob consulta":"On request"):v;return <div className="filterGroup"><b>{title}</b>{values.map(v=><button className={active===v?"active":""} onClick={()=>set(v)} key={v}><i/>{label(v)}</button>)}</div>}
