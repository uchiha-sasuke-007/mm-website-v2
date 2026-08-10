const whatsapp = "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MM";

const products = [
  {
    name: "iPhone 15 Pro",
    spec: "Titânio • 256 GB",
    price: "Sob consulta",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=90",
    tone: "violet",
  },
  {
    name: "Galaxy S24 Ultra",
    spec: "Titânio • 256 GB",
    price: "Sob consulta",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=90",
    tone: "blue",
  },
  {
    name: "iPhone 14",
    spec: "Meia-noite • 128 GB",
    price: "Sob consulta",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=900&q=90",
    tone: "amber",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Navegação principal">
        <a className="brand" href="#top" aria-label="MM início"><span className="logoFrame"><img src="/logo-mm.png" alt="" /></span><small>mobile & repair</small></a>
        <div className="navLinks">
          <a href="#smartphones">Smartphones</a><a href="#reparacao">Reparação</a><a href="#loja">A loja</a>
        </div>
        <a className="navCta" href={whatsapp}>Falar no WhatsApp <span>↗</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="heroGlow" />
        <div className="heroCopy">
          <div className="eyebrow"><i /> Tecnologia que acompanha você</div>
          <h1>Seu próximo<br />smartphone.<br /><em>Ou uma nova vida<br />para o atual.</em></h1>
          <p>Smartphones selecionados e reparação especializada, com atendimento direto e transparente.</p>
          <div className="heroActions">
            <a className="button primary" href="#smartphones">Ver smartphones <span>→</span></a>
            <a className="button ghost" href="#reparacao">Reparar meu celular</a>
          </div>
          <div className="trustLine"><span>✓ Atendimento especializado</span><span>✓ Diagnóstico transparente</span></div>
        </div>

        <div className="heroVisual" aria-label="Smartphone premium em destaque">
          <div className="orbit orbitOne" /><div className="orbit orbitTwo" />
          <div className="phone mainPhone">
            <div className="phoneTop" />
            <div className="phoneScreen"><span className="screenTime">09:41</span><div className="screenOrb" /><span className="screenBrand"><img src="/logo-mm.png" alt="MM" /></span></div>
          </div>
          <div className="floatCard stock"><span className="miniIcon">◆</span><div><small>DISPONÍVEL</small><b>Modelos selecionados</b></div></div>
          <div className="floatCard repair"><span className="miniIcon">✦</span><div><small>ASSISTÊNCIA</small><b>Diagnóstico especializado</b></div></div>
          <div className="scrollHint"><i /> role para explorar</div>
        </div>
      </section>

      <section className="proofBand">
        <div className="shell proofGrid">
          <div><b>01</b><span>Compra segura</span><small>Atendimento humano do início ao fim</small></div>
          <div><b>02</b><span>Seleção cuidadosa</span><small>Aparelhos escolhidos com critério</small></div>
          <div><b>03</b><span>Reparo especialista</span><small>Diagnóstico claro antes do serviço</small></div>
        </div>
      </section>

      <section className="products shell" id="smartphones">
        <div className="sectionHead">
          <div><div className="eyebrow"><i /> Seleção MM</div><h2>Smartphones em<br /><em>destaque.</em></h2></div>
          <p>Design, desempenho e confiabilidade. Consulte as opções disponíveis e encontre o aparelho ideal para você.</p>
        </div>
        <div className="productGrid">
          {products.map((product, index) => (
            <article className={`productCard ${product.tone}`} key={product.name}>
              <div className="productIndex">0{index + 1}</div>
              <div className="productImage"><img src={product.image} alt={product.name} /></div>
              <div className="productInfo"><div><h3>{product.name}</h3><p>{product.spec}</p></div><span className="availability">● Consulte disponibilidade</span></div>
              <div className="productBottom"><div><small>A partir de</small><strong>{product.price}</strong></div><a href={`${whatsapp}&text=Tenho%20interesse%20no%20${encodeURIComponent(product.name)}`} aria-label={`Consultar ${product.name}`}>Consultar <span>↗</span></a></div>
            </article>
          ))}
        </div>
        <div className="productsCta"><span>Não encontrou o modelo que procura?</span><a href={whatsapp}>Consultar outros modelos <b>→</b></a></div>
      </section>

      <section className="repairSection" id="reparacao">
        <div className="shell repairGrid">
          <div className="repairVisual">
            <div className="repairHalo" />
            <div className="diagnosticPhone"><div className="crack c1" /><div className="crack c2" /><div className="scanLine" /><span>ANÁLISE<br />MM</span></div>
            <div className="toolBadge battery"><b>82%</b><small>SAÚDE DA BATERIA</small></div>
            <div className="toolBadge diagnosis"><b>✓</b><small>DIAGNÓSTICO PRECISO</small></div>
          </div>
          <div className="repairCopy">
            <div className="eyebrow"><i /> Assistência técnica</div>
            <h2>Quebrou?<br /><em>A gente resolve.</em></h2>
            <p>Seu celular faz parte da sua rotina. Por isso, cuidamos dele com técnica, atenção e transparência em cada etapa.</p>
            <div className="repairList">
              <div><span>01</span><b>Troca de tela</b><small>Imagem e toque restaurados</small></div>
              <div><span>02</span><b>Bateria</b><small>Mais autonomia para o seu dia</small></div>
              <div><span>03</span><b>Conector de carga</b><small>Carregamento estável novamente</small></div>
              <div><span>04</span><b>Diagnóstico</b><small>Investigação técnica completa</small></div>
            </div>
            <a className="button primary repairButton" href={whatsapp}>Pedir diagnóstico pelo WhatsApp <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="process shell">
        <div className="sectionHead compact"><div><div className="eyebrow"><i /> Simples e transparente</div><h2>Como funciona.</h2></div></div>
        <div className="steps"><div><b>01</b><h3>Conte o problema</h3><p>Envie uma mensagem e explique o que aconteceu.</p></div><div><b>02</b><h3>Receba a orientação</h3><p>Avaliamos o caso e indicamos o próximo passo.</p></div><div><b>03</b><h3>Deixe com a MM</h3><p>Seu aparelho recebe o cuidado técnico necessário.</p></div></div>
      </section>

      <section className="finalCta shell" id="loja">
        <div className="ctaGlow" />
        <div><div className="eyebrow light"><i /> Pronto para falar com a MM?</div><h2>Seu novo smartphone<br />começa <em>aqui.</em></h2></div>
        <div className="ctaSide"><p>Consulte disponibilidade, tire dúvidas ou peça um diagnóstico direto pelo WhatsApp.</p><a className="button white" href={whatsapp}>Iniciar conversa <span>↗</span></a></div>
      </section>

      <footer className="shell"><a className="brand" href="#top"><span className="logoFrame"><img src="/logo-mm.png" alt="" /></span><small>mobile & repair</small></a><p>Smartphones e assistência técnica especializada.</p><div><a href="#smartphones">Smartphones</a><a href="#reparacao">Reparação</a><a href={whatsapp}>WhatsApp</a></div><small>© 2026 MM Mobile & Repair</small></footer>
    </main>
  );
}
