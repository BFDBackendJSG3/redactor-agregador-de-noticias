import { api } from './api';

export async function listarNoticias(page = 1, filtros = {}) {
  const params = {
    page,
    limit: 10,
    ...filtros, // tema, municipio, dataInicio, dataFim, search
  };
  const res = await api.get('/noticias', { params });
  return res.data;
}

export async function listarNoticiasAdmin(page = 1, filtros = {}) {
  const params = {
    page,
    limit: 10,
    ...filtros, // tema, municipio, dataInicio, dataFim, search, status
  };
  const res = await api.get('/noticias/admin', { params });
  return res.data;
}

export async function detalharNoticia(id) {
  const res = await api.get(`/noticias/${id}`);
  return res.data;
}

export async function criarNoticiaManual(payload) {
  // payload: { titulo, subtitulo, conteudo, temaPrincipalId, municipios }
  const res = await api.post('/noticias', payload);
  return res.data;
}

export async function atualizarNoticia(id, payload) {
  // payload: { titulo, conteudo, status, fonteId, temaPrincipalId }
  const res = await api.put(`/noticias/${id}`, payload);
  return res.data;
}

export async function deletarNoticia(id) {
  const res = await api.delete(`/noticias/${id}`);
  return res.data;
}

export async function aprovarNoticia(id) {
  const res = await api.put(`/noticias/${id}`, { status: 'publicado' });
  return res.data;
}
