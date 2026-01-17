import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { atualizarUsuario } from '@/services/users-service';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const TIPOS_USUARIO = ['ADMIN', 'USER', 'ESTAGIARIO', 'JORNALISTA', 'EDITOR'];

function EditUserDialog({ usuario, onUpdated }) {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState(usuario.tipoUsuario);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const isSelfAdmin = user?.tipoUsuario === 'ADMIN' && user?.id === usuario.id;

  async function handleUpdate() {
    try {
      setLoading(true);

      if (tipoUsuario !== usuario.tipoUsuario) {
        const confirmar = confirm(
          `Deseja realmente alterar o tipo de usuário de ${usuario.tipoUsuario} para ${tipoUsuario}?`
        );

        if (!confirmar) {
          setLoading(false);
          return;
        }
      }

      await atualizarUsuario(usuario.id, {
        nome,
        email,
        tipoUsuario,
        ...(password && { password }),
      });

      toast.success('Usuário atualizado com sucesso!');
      setOpen(false);
      onUpdated();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao atualizar usuário');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="Nova senha (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isSelfAdmin && (
            <select
              className="border-input bg-background h-9 rounded-md border px-3 text-sm"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
            >
              {TIPOS_USUARIO.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          )}

          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserDialog;
