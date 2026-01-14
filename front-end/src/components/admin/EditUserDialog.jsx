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
import { atualizarUsuario } from '@/services/user-service';

function EditUserDialog({ usuario, onUpdated }) {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleUpdate() {
    try {
      setLoading(true);

      await atualizarUsuario(usuario.id, {
        nome,
        email,
        ...(password && { password }),
      });

      alert('Usuário atualizado com sucesso');
      setOpen(false);
      onUpdated();
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao atualizar usuário');
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

          <Button onClick={handleUpdate} disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserDialog;