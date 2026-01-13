import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

function MeuPerfil() {
  const { user, setUser } = useAuth();

  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) {
    return <p className="mt-10 text-center">Carregando perfil...</p>;
  }

  async function handleSave() {
    try {
      setLoading(true);

      const payload = {};

      if (nome !== user.nome) payload.nome = nome;
      if (email !== user.email) payload.email = email;
      if (password.trim() !== '') payload.password = password;

      if (Object.keys(payload).length === 0) {
        alert('Nada foi alterado.');
        setLoading(false);
        return;
      }

      const { data } = await api.put(`/users/${user.id}`, payload);

      setUser({
        ...user,
        nome: data.nome,
        email: data.email,
      });

      alert('Perfil atualizado com sucesso! Faça login novamente.');
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/login';
      setEditando(false);
      setPassword('');
    } catch (err) {
      console.log('ERRO AXIOS:', err);
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert('Erro de comunicação com o servidor');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-card mx-auto max-w-md rounded-xl border p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Meu Perfil</h1>

      <div className="space-y-4">
        <div>
          <label className="text-muted-foreground text-sm">Nome</label>
          <Input
            value={nome}
            disabled={!editando}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label className="text-muted-foreground text-sm">Email</label>
          <Input
            value={email}
            disabled={!editando}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {editando && (
          <div>
            <label className="text-muted-foreground text-sm">
              Nova senha (opcional)
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {!editando ? (
          <Button onClick={() => setEditando(true)} className="w-full">
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setEditando(false);
                setNome(user.nome);
                setEmail(user.email);
                setPassword('');
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeuPerfil;
