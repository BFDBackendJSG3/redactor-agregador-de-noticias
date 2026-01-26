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

export async function addNewsToFavorites(newsId) {
  await api.post('/favoritos', { noticiaId: newsId });
}

export async function removeNewsFromFavorites(newsId) {
  await api.delete(`/favoritos/${newsId}`);
}

export async function listFavoriteNews() {
  await api.get('/favoritos');
}
