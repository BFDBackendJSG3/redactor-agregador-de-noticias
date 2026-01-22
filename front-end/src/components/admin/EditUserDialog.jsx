import { useEffect, useState } from 'react';
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
import { Loader2Icon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function EditUserDialog({ usuario, onUpdated }) {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState(usuario.tipoUsuario);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirmRoleChange, setConfirmRoleChange] = useState(false);

  useEffect(() => {
    setTipoUsuario(usuario.tipoUsuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
  }, [usuario]);

  const isSelfAdmin = user?.tipoUsuario === 'ADMIN' && user?.id === usuario.id;

  async function handleUpdate() {
    try {
      setLoading(true);
      //se mudar o tipo de usuario
      if (tipoUsuario !== usuario.tipoUsuario && !confirmRoleChange) {
        setConfirmRoleChange(true);
        return;
      }

      await atualizarUsuario(usuario.id, {
        nome,
        email,
        tipoUsuario,
        ...(password && { password }),
      });
      setConfirmRoleChange(false);
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
            <Select
              value={tipoUsuario}
              onValueChange={(e) => setTipoUsuario(e)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo de usuário" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="USER">Usuário</SelectItem>
                <SelectItem value="ESTAGIARIO">Estagiário</SelectItem>
                <SelectItem value="JORNALISTA">Jornalista</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="ADMIN">Administrador</SelectItem>
              </SelectContent>
            </Select>
          )}
          {confirmRoleChange && (
            <div className="rounded-md border border-yellow-500 bg-yellow-50 p-3 text-sm">
              <p className="font-medium text-yellow-800">
                Você está alterando o tipo do usuário
              </p>

              <p className="text-yellow-700">
                De <b>{usuario.tipoUsuario}</b> para <b>{tipoUsuario}</b>
              </p>
            </div>
          )}
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : confirmRoleChange ? (
              'Confirmar alteração'
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserDialog;
