const { Noticia, Fonte, TemaPrincipal, Municipio } = require('../../models');
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
        required: false, // LEFT JOIN
      },
    ];

    // Filtro por tipo de notícia (manual / importada)
    if (tipoNoticia) {
      where.tipoNoticia = tipoNoticia;
    }

    // Filtro por status (publicado / aguardando_aprovacao)
    if (status) {
      where.status = status;
    }

    // Controlar exposição de publicações por tipo
    // de perfil do usuário.
    const perfisRestritos = ['VISITANTE', 'USER'];
    if (perfisRestritos.includes(tipoUsuario) && !status) {
      where.status = 'publicado';
    }

    // Filtro por tema
    if (tema) {
      where.temaPrincipalId = tema;
    }

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
      if (dataInicio) {
        where.dataDePublicacao[Op.gte] = new Date(dataInicio);
      }
      if (dataFim) {
        where.dataDePublicacao[Op.lte] = new Date(dataFim);
      }
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

    return {
      data: rows,
      meta: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  },
};
