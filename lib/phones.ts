export type Phone = {
  slug: string;
  brand: "Apple" | "Samsung" | "Tecno" | "Infinix" | "Outros";
  model: string;
  storage: string;
  color: string;
  colorEn: string;
  storageOptions: string[];
  colorOptions: PhoneColor[];
  condition: "Novo" | "Seminovo" | "Sob consulta";
  price: string;
  available: boolean;
  image: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
};
export type PhoneColor = { pt: string; en: string; hex: string };

const iphoneModels = ["iPhone 13 Pro Max", "iPhone 14 Pro Max", "iPhone 15 Pro Max", "iPhone 16 Pro Max", "iPhone 17 Pro Max"];
const samsungModels = ["Galaxy A8","Galaxy A6","Galaxy A10","Galaxy A20","Galaxy A30","Galaxy A50","Galaxy A70","Galaxy A21s","Galaxy A31","Galaxy A51","Galaxy A71","Galaxy A12","Galaxy A22","Galaxy A32","Galaxy A52","Galaxy A72","Galaxy A13","Galaxy A23","Galaxy A33","Galaxy A53","Galaxy A73","Galaxy A14","Galaxy A24","Galaxy A34","Galaxy A54","Galaxy A15","Galaxy A25","Galaxy A35","Galaxy A55","Galaxy A16","Galaxy A26","Galaxy A36","Galaxy A56","Galaxy A17"];

type ProductOptions = { storage: string[]; colors: PhoneColor[] };
const colour = (pt:string,en:string,hex:string):PhoneColor => ({pt,en,hex});
const options:Record<string,ProductOptions> = {
  "iPhone 13 Pro Max":{storage:["128 GB","256 GB","512 GB","1 TB"],colors:[colour("Grafite","Graphite","#4b4a46"),colour("Dourado","Gold","#f4e8ce"),colour("Prateado","Silver","#f1f2ed"),colour("Azul Sierra","Sierra Blue","#9fb4c5"),colour("Verde Alpino","Alpine Green","#576856")]},
  "iPhone 14 Pro Max":{storage:["128 GB","256 GB","512 GB","1 TB"],colors:[colour("Preto sideral","Space Black","#3f3f3d"),colour("Prateado","Silver","#f1f2ed"),colour("Dourado","Gold","#f4e8ce"),colour("Roxo profundo","Deep Purple","#665f6b")]},
  "iPhone 15 Pro Max":{storage:["256 GB","512 GB","1 TB"],colors:[colour("Titânio natural","Natural Titanium","#aaa294"),colour("Titânio azul","Blue Titanium","#3f4e5a"),colour("Titânio branco","White Titanium","#f2f1eb"),colour("Titânio preto","Black Titanium","#42413e")]},
  "iPhone 16 Pro Max":{storage:["256 GB","512 GB","1 TB"],colors:[colour("Titânio preto","Black Titanium","#3c3c3b"),colour("Titânio branco","White Titanium","#f2f1eb"),colour("Titânio natural","Natural Titanium","#aaa294"),colour("Titânio deserto","Desert Titanium","#c8aa92")]},
  "iPhone 17 Pro Max":{storage:["256 GB","512 GB","1 TB","2 TB"],colors:[colour("Prateado","Silver","#e5e7e6"),colour("Azul profundo","Deep Blue","#26374a"),colour("Laranja cósmico","Cosmic Orange","#d86d31")]},
};
const samsungOptions = (model:string):ProductOptions => {
  const number = Number(model.replace("Galaxy A",""));
  const storage = number >= 15 ? ["128 GB","256 GB"] : ["32 GB","64 GB"];
  const palettes:Record<number,PhoneColor[]> = {
    56:[colour("Grafite","Graphite","#3c4043"),colour("Cinzento claro","Lightgray","#d8d6ce"),colour("Verde oliva","Olive","#b8c4a7"),colour("Rosa","Pink","#e9c4c8")],
    55:[colour("Azul gelo","Iceblue","#d7e4ec"),colour("Lilás","Lilac","#c9c1dc"),colour("Limão","Lemon","#e1e7ad"),colour("Azul marinho","Navy","#28384c")],
    36:[colour("Preto","Black","#252729"),colour("Cinzento","Gray","#c7c9c8"),colour("Lavanda","Lavender","#c8bfe0"),colour("Verde lima","Lime","#dbe4b8")],
    35:[colour("Azul gelo","Iceblue","#d7e4ec"),colour("Lilás","Lilac","#c9c1dc"),colour("Limão","Lemon","#e1e7ad"),colour("Azul marinho","Navy","#28384c")],
    26:[colour("Preto","Black","#252729"),colour("Branco","White","#eeeeea"),colour("Verde menta","Mint","#c7d9cc"),colour("Rosa pêssego","Peach Pink","#e6c0bb")],
    25:[colour("Azul escuro","Blue Black","#26323a"),colour("Azul","Blue","#8daebd"),colour("Amarelo","Yellow","#d9d69d")],
    17:[colour("Preto","Black","#252729"),colour("Azul","Blue","#7895ad"),colour("Cinzento","Gray","#b8bab7")],
    16:[colour("Preto","Black","#252729"),colour("Cinzento","Gray","#b8bab7"),colour("Verde claro","Light Green","#b9cab7")],
  };
  return {storage,colors:palettes[number]??[colour("Preto","Black","#252729"),colour("Azul","Blue","#718fa8"),colour("Branco","White","#ecece8")]};
};

const slugify = (model:string) => model.toLowerCase().replace(/\s+/g,"-");
const makePhone = (brand:"Apple"|"Samsung", model:string, folder:"iphone"|"samsung"):Phone => {
 const variants = options[model] ?? samsungOptions(model);
 return ({
  slug:slugify(model),
  brand,
  model,
  storage:variants.storage[0],
  color:variants.colors[0].pt,
  colorEn:variants.colors[0].en,
  storageOptions:variants.storage,
  colorOptions:variants.colors,
  condition:"Sob consulta",
  price:"Consultar preço",
  available:false,
  image:`/phones/${folder}/${slugify(model)}.png`,
  description:"Modelo disponível para consulta. Confirme com a MM a capacidade, cor, condição, preço e disponibilidade atuais.",
  descriptionEn:"Model available for enquiry. Confirm current capacity, colour, condition, price and availability with MM.",
  features:["Capacidade sob consulta","Cor sob consulta","Condição sob consulta","Disponibilidade sob consulta"],
  featuresEn:["Capacity on request","Colour on request","Condition on request","Availability on request"],
 });
};

export const phones:Phone[] = [
  ...iphoneModels.map(model=>makePhone("Apple",model,"iphone")),
  ...samsungModels.map(model=>makePhone("Samsung",model,"samsung")),
];

export const WHATSAPP_NUMBER = "244923933692";
export function whatsappUrl(message:string){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}

