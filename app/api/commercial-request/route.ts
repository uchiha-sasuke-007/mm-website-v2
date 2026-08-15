const DESTINATION_EMAIL = "comercialmm09@gmail.com";

type RequestBody = {name?:string;company?:string;email?:string;phone?:string;quantity?:number;message?:string;brand?:string;model?:string;condition?:string;storage?:string;color?:string;lang?:string};
const clean=(value:unknown,max=500)=>String(value??"").trim().slice(0,max);
const escapeHtml=(value:string)=>value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[char]||char);

export async function POST(request:Request){
  const apiKey=process.env.RESEND_API_KEY;const from=process.env.EMAIL_FROM;
  if(!apiKey||!from)return Response.json({error:"Email service is not configured"},{status:503});
  let body:RequestBody;try{body=await request.json()}catch{return Response.json({error:"Invalid request"},{status:400})}
  const data={name:clean(body.name,120),company:clean(body.company,160),email:clean(body.email,180),phone:clean(body.phone,60),quantity:Math.max(1,Number(body.quantity)||1),message:clean(body.message,3000),brand:clean(body.brand,80),model:clean(body.model,140),condition:clean(body.condition,80),storage:clean(body.storage,80),color:clean(body.color,100)};
  if(!data.name||!data.email||!data.brand||!data.model||!data.storage||!data.color||!/^\S+@\S+\.\S+$/.test(data.email))return Response.json({error:"Missing or invalid fields"},{status:400});
  const subject=`Pedido comercial MM — ${data.quantity>1?`${data.quantity}x `:""}${data.brand} ${data.model}`;
  const html=`<h2>NOVO PEDIDO COMERCIAL — MM</h2><h3>DADOS DO CLIENTE</h3><p><b>Nome:</b> ${escapeHtml(data.name)}<br><b>Empresa:</b> ${escapeHtml(data.company||"—")}<br><b>E-mail:</b> ${escapeHtml(data.email)}<br><b>Telefone:</b> ${escapeHtml(data.phone||"—")}</p><h3>PRODUTO</h3><p><b>Marca:</b> ${escapeHtml(data.brand)}<br><b>Modelo:</b> ${escapeHtml(data.model)}<br><b>Condição:</b> ${escapeHtml(data.condition)}<br><b>Armazenamento:</b> ${escapeHtml(data.storage)}<br><b>Cor:</b> ${escapeHtml(data.color)}<br><b>Quantidade:</b> ${data.quantity}</p><h3>MENSAGEM</h3><p>${escapeHtml(data.message||"—").replace(/\n/g,"<br>")}</p>`;
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{authorization:`Bearer ${apiKey}`,"content-type":"application/json"},body:JSON.stringify({from,to:[DESTINATION_EMAIL],reply_to:data.email,subject,html})});
  if(!response.ok)return Response.json({error:"Email provider rejected the request"},{status:502});
  return Response.json({ok:true});
}
