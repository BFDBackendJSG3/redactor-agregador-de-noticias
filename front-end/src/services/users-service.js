import { api } from './api';

export async function register(data) {
  const res = await api.post('/register', data);
  return res.data;
}

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