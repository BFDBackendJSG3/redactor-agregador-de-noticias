const { Municipio } = require('../../models');

class MunicipiosController {
  async listar(req, res) {
    try {
      const municipios = await Municipio.findAll({
        attributes: ['id', 'nome'],
        order: [['nome', 'ASC']],
      });

      return res.json(municipios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao listar municípios',
      });
    }
  }

  async buscarPorNome(req, res) {
    try {
      const { nome } = req.params;

      if (!nome) {
        return res.status(400).json({
          erro: 'Nome da cidade é obrigatório',
        });
      }

      const municipio = await Municipio.findOne({
        where: { nome: nome.replace(/-/g, ' ') },
        attributes: ['id', 'nome'],
      });

      if (!municipio) {
        return res.status(404).json({
          erro: 'Município não encontrado',
        });
      }

      return res.json(municipio);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao buscar município',
      });
    }
  }
}

module.exports = new MunicipiosController();
