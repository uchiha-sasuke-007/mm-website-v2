export type Phone = {
  slug: string;
  brand: "Apple" | "Samsung" | "Tecno" | "Infinix" | "Outros";
  model: string;
  storage: string;
  color: string;
  colorEn: string;
  condition: "Novo" | "Seminovo";
  price: string;
  available: boolean;
  image: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
};

// DADOS DE DEMONSTRAÇÃO — SUBSTITUIR POR STOCK REAL ANTES DA PUBLICAÇÃO OFICIAL.
// A estrutura abaixo foi mantida simples para facilitar a troca de produtos.
export const phones: Phone[] = [
  { slug:"iphone-15-pro", brand:"Apple", model:"iPhone 15 Pro", storage:"256 GB", color:"Titânio natural", colorEn:"Natural titanium", condition:"Novo", price:"Consultar preço", available:true, image:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=90", description:"Desempenho avançado, acabamento em titânio e um sistema de câmaras preparado para todos os momentos.", descriptionEn:"Advanced performance, titanium finish and a camera system ready for every moment.", features:["Ecrã Super Retina XDR","Chip A17 Pro","Sistema de câmaras Pro","USB-C"], featuresEn:["Super Retina XDR display","A17 Pro chip","Pro camera system","USB-C"] },
  { slug:"galaxy-s24-ultra", brand:"Samsung", model:"Galaxy S24 Ultra", storage:"256 GB", color:"Preto titânio", colorEn:"Titanium black", condition:"Novo", price:"Consultar preço", available:true, image:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=90", description:"Produtividade, fotografia e desempenho premium num telefone feito para ir mais longe.", descriptionEn:"Productivity, photography and premium performance in a smartphone built to go further.", features:["Ecrã Dynamic AMOLED","S Pen integrada","Câmara de alta resolução","Construção em titânio"], featuresEn:["Dynamic AMOLED display","Built-in S Pen","High-resolution camera","Titanium construction"] },
  { slug:"iphone-14", brand:"Apple", model:"iPhone 14", storage:"128 GB", color:"Meia-noite", colorEn:"Midnight", condition:"Seminovo", price:"Consultar preço", available:true, image:"https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=1200&q=90", description:"Uma experiência Apple equilibrada, fluida e fiável para o dia a dia.", descriptionEn:"A balanced, smooth and reliable Apple experience for everyday use.", features:["Ecrã Super Retina XDR","Chip A15 Bionic","Câmara dupla","Face ID"], featuresEn:["Super Retina XDR display","A15 Bionic chip","Dual camera","Face ID"] },
  { slug:"galaxy-a55", brand:"Samsung", model:"Galaxy A55 5G", storage:"128 GB", color:"Azul gelo", colorEn:"Ice blue", condition:"Novo", price:"Consultar preço", available:true, image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=90", description:"Design elegante, conectividade 5G e bateria para acompanhar a rotina.", descriptionEn:"Elegant design, 5G connectivity and battery life for your daily routine.", features:["Conectividade 5G","Ecrã AMOLED","Bateria de longa duração","Câmara tripla"], featuresEn:["5G connectivity","AMOLED display","Long-lasting battery","Triple camera"] },
  { slug:"tecno-camon-30", brand:"Tecno", model:"Camon 30", storage:"256 GB", color:"Preto", colorEn:"Black", condition:"Novo", price:"Consultar preço", available:true, image:"https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1200&q=90", description:"Muito espaço, fotografia versátil e uma presença moderna.", descriptionEn:"Generous storage, versatile photography and a modern presence.", features:["256 GB de armazenamento","Câmara principal de alta resolução","Carregamento rápido","Ecrã amplo"], featuresEn:["256 GB storage","High-resolution main camera","Fast charging","Large display"] },
  { slug:"infinix-note-40", brand:"Infinix", model:"Note 40", storage:"256 GB", color:"Obsidiana", colorEn:"Obsidian", condition:"Novo", price:"Consultar preço", available:false, image:"https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1200&q=90", description:"Desempenho competente, ecrã envolvente e energia para o dia inteiro.", descriptionEn:"Capable performance, immersive display and power for the whole day.", features:["Ecrã AMOLED","Carregamento rápido","Som estéreo","Amplo armazenamento"], featuresEn:["AMOLED display","Fast charging","Stereo sound","Generous storage"] },
];

export const WHATSAPP_NUMBER = "244923933692";
export function whatsappUrl(message: string) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
