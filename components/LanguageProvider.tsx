"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "pt" | "en";
const LanguageContext = createContext<{lang:Lang;setLang:(lang:Lang)=>void}>({lang:"pt",setLang:()=>{}});
export function LanguageProvider({children}:{children:React.ReactNode}){
  const [lang,setLangState]=useState<Lang>("pt");
  useEffect(()=>{const timer=window.setTimeout(()=>{const saved=localStorage.getItem("mm-lang");if(saved==="en"){setLangState("en");document.documentElement.lang="en"}},0);return()=>window.clearTimeout(timer)},[]);
  const setLang=(next:Lang)=>{setLangState(next);localStorage.setItem("mm-lang",next);document.documentElement.lang=next==="pt"?"pt-AO":"en"};
  return <LanguageContext.Provider value={{lang,setLang}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){return useContext(LanguageContext)}
export function T({pt,en}:{pt:React.ReactNode;en:React.ReactNode}){const {lang}=useLanguage();return <>{lang==="pt"?pt:en}</>}
