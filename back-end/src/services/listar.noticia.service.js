const {
  Noticia,
  Fonte,
  TemaPrincipal,
  Municipio,
  Favorito,
} = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  async execute(filtros) {
    const {
      page = 1,
      limit = 10,
      tema,
      municipio,
      dataInicio,
      dataFim,
      search,
      tipoUsuario,
      tipoNoticia,
      status,
      userId,
    } = filtros;

    const where = {};
    const include = [
      {
        model: Fonte,
        as: 'fonte',
        attributes: ['id', 'responsavel', 'tipo', 'url'],
      },
      {
        model: TemaPrincipal,
        as: 'temaPrincipal',
        attributes: ['id', 'nome'],
      },
      {
        model: Municipio,
        as: 'municipios',
        through: { attributes: [] },
        attributes: ['id', 'nome'],
        required: false,
      },
    ];

    // Sempre filtra por status publicado, independente de login
    if (status) {
      where.status = status;
    } else {
      where.status = 'publicado';
    }

    // Se estiver logado, inclui favoritos para calcular isFavorito
    if (userId) {
      include.push({
        model: Favorito,
        as: 'favoritos',
        attributes: ['id'],
        where: { userId },
        required: false,
      });
    }
    // Filtro por tipo de notícia (manual / importada)
    if (tipoNoticia) where.tipoNoticia = tipoNoticia;

    // Filtro por tema
    if (tema) where.temaPrincipalId = tema;

    // Filtro por município
    if (municipio) {
      const normalizedMunicipio = municipio
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(/Joao/g, 'João'); // Adicionar acentos comuns

      const municipioWhere = isNaN(municipio)
        ? { nome: { [Op.iLike]: normalizedMunicipio } }
        : { id: municipio };

      // Remover o include padrão e adicionar um novo com filtro
      const municipioIndex = include.findIndex(
        (inc) => inc.as === 'municipios'
      );
      if (municipioIndex !== -1) {
        include.splice(municipioIndex, 1);
      }

      include.push({
        model: Municipio,
        as: 'municipios',
        where: municipioWhere,
        through: { attributes: [] },
        attributes: ['id', 'nome'],
        required: true, // INNER JOIN quando há filtro
      });
    }
    // Filtro por data
    if (dataInicio || dataFim) {
      where.dataDePublicacao = {};
      if (dataInicio) where.dataDePublicacao[Op.gte] = new Date(dataInicio);
      if (dataFim) where.dataDePublicacao[Op.lte] = new Date(dataFim);
    }

    // Busca textual
    if (search) {
      where[Op.or] = [
        { titulo: { [Op.iLike]: `%${search}%` } },
        { conteudo: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Paginação
    const offset = (page - 1) * limit;

    const { rows, count } = await Noticia.findAndCountAll({
      where,
      include,
      order: [['dataDePublicacao', 'DESC']],
      limit: Number(limit),
      offset,
      distinct: true,
    });

    // ✅ Remove array favoritos e retorna só boolean
    const noticiasFormatadas = rows.map((noticia) => {
      const json = noticia.toJSON();

      return {
        ...json,
        favoritos: undefined, // remove do payload
        isFavorito: userId ? json.favoritos?.length > 0 : false,
      };
    });

    return {
      data: noticiasFormatadas,
      meta: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  },
};
