function classificarNoticia({ titulo, conteudo }) {
  const texto = `${titulo} ${conteudo}`.toLowerCase();

  let temaDetectado = null;
  let maiorPontuacao = 0;

  const regras = {
    Politica: {
      id: 2,
      palavras: [
        'governo',
        'prefeito',
        'vereador',
        'deputado',
        'senado',
        'eleição',
        'política',
        'partido',
      ],
    },
    Saude: {
      id: 3,
      palavras: [
        'saúde',
        'hospital',
        'médico',
        'vacina',
        'doença',
        'covid',
        'tratamento',
      ],
    },
    Educacao: {
      id: 4,
      palavras: [
        'educação',
        'escola',
        'universidade',
        'professor',
        'aluno',
        'enem',
        'vestibular',
      ],
    },
  };

  for (const tema in regras) {
    let pontos = 0;

    for (const palavra of regras[tema].palavras) {
      if (texto.includes(palavra)) {
        pontos++;
      }
    }

    if (pontos > maiorPontuacao) {
      maiorPontuacao = pontos;
      temaDetectado = regras[tema].id;
    }
  }

  return temaDetectado || 1; // 1 = Geral
}

module.exports = { classificarNoticia };
