function About() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10">
        <div>
          <h1 className="mb-2 text-xl font-semibold">Sobre Nós</h1>
          <p className="text-md text-muted-foreground">
            Somos um agregador de notícias desenvolvido com foco em
            simplicidade, desempenho e boa experiência do usuário. Nosso
            objetivo é reunir informações de diferentes fontes em um único
            lugar, facilitando o acesso a conteúdos relevantes de forma rápida e
            organizada.
          </p>
        </div>

        {/* Nossa Missão */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Nossa Missão</h2>
          <p className="text-muted-foreground">
            Tornar o acesso à informação mais democrático, prático e
            transparente, conectando pessoas às notícias mais importantes do dia
            sem distrações, excesso de propaganda ou consumo desnecessário de
            dados.
          </p>
        </section>

        {/* Nossa Visão */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Nossa Visão</h2>
          <p className="text-muted-foreground">
            Ser uma das plataformas de notícias mais acessíveis e confiáveis,
            capaz de entregar conteúdo de forma ágil e inteligente — evoluindo
            continuamente com novos recursos.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
