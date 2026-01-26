import { api } from './api';

//usuário se cadastra
export async function register(data) {
  const res = await api.post('/register', data);
  return res.data;
}

//admin cadastra usuário
export async function criarUsuario(payload) {
  const res = await api.post('/users', payload);
  return res.data;
}

export async function listarUsuarios() {
  const res = await api.get('/users');
  return res.data;
}

export async function atualizarUsuario(id, dados) {
  const res = await api.put(`/users/${id}`, dados);
  return res.data;
}

export async function deletarUsuario(id) {
  await api.delete(`/users/${id}`);
}

export async function listFavoriteNews() {
  const res = await api.get('/favoritos');
  return res.data;
}

export async function toggleFavorite(newsId) {
  const res = await api.post('favoritos/toggle', {
    noticiaId: newsId,
  });
  return res.data;
}
