import { api } from './api';

export async function listarNoticias(page = 1) {
  const res = await api.get('/noticias', {
    params: {
      page,
      limit: 10,
    },
  });
  return res.data;
}

export async function detalharNoticia(id) {
  const res = await api.get(`/noticias/${id}`);
  return res.data;
}

export async function importarNoticia(payload) {
  const res = await api.post('/importar-noticia', payload);
  return res.data;
}
