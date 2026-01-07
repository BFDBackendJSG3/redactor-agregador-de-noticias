import { api } from './api';

export async function criarUsuario(payload) {
  const res = await api.post('/users', payload);
  return res.data;
}

export async function listarUsuarios() {
  const res = await api.get('/users');
  return res.data;
}
