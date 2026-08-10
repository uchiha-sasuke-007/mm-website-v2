import { notFound } from "next/navigation";import { phones } from "../../../lib/phones";import ProductDetail from "./product-detail";
export function generateStaticParams(){return phones.map(p=>({slug:p.slug}))}
export default async function PhoneDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const phone=phones.find(p=>p.slug===slug);if(!phone)notFound();return <ProductDetail phone={phone}/>}
