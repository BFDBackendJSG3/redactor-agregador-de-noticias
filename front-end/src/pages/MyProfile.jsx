import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Loader2Icon } from 'lucide-react';
import { capitalizeString } from '@/utils/formatDateAndText';
import { Badge } from '@/components/ui/badge';

function MyProfile() {
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
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  async function handleSave() {
    try {
      setLoading(true);

      const payload = {};

      if (nome !== user.nome) payload.nome = nome;
      if (email !== user.email) payload.email = email;
      if (password.trim() !== '') payload.password = password;

      if (Object.keys(payload).length === 0) {
        toast.warning('Nada foi alterado.');
        setLoading(false);
        return;
      }

      const { data } = await api.put(`/users/${user.id}`, payload);

      setUser({
        ...user,
        nome: data.nome,
        email: data.email,
      });
      toast.success('Perfil atualizado com sucesso! Faça login novamente.');
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/login';
      setEditando(false);
      setPassword('');
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Erro de comunicação com o servidor');
      }
    } finally {
      setLoading(false);
    }
  }
  console.log(user);

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardTitle className="text-center text-xl">
          Informações Pessoais
        </CardTitle>
        <CardContent>
          <div className="space-y-4">
            <div className="gap-3 md:flex">
              <div className="flex-1">
                <label className="text-muted-foreground text-sm">Nome</label>
                <Input
                  value={nome}
                  disabled={!editando}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="mt-5 flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Perfil:</span>

                <Badge variant="secondary" className="text-xs">
                  {capitalizeString(user.tipoUsuario)}
                </Badge>
              </div>
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
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyProfile;
