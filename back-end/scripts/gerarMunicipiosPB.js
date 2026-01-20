const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function gerarMunicipiosPB() {
  try {
    const url =
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados/25/municipios';

    const response = await axios.get(url);

    const municipios = response.data.map((m) => ({
      nome: m.nome,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const outputPath = path.resolve(
      __dirname,
      '../seeders/municipios-pb.json'
    );

    fs.writeFileSync(outputPath, JSON.stringify(municipios, null, 2));

    console.log(`✔ ${municipios.length} municípios da PB gerados com sucesso`);
  } catch (error) {
    console.error('Erro ao gerar municípios:', error.message);
  }
}

gerarMunicipiosPB();
