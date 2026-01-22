import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { criarUsuario } from '@/services/users-service';
import { toast } from 'sonner';
import { Loader2Icon, User } from 'lucide-react';

function CreateUserDialog({ onCreated }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('USER');
  const [open, setOpen] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(null);

  async function handleCreateUser() {
    if (!nome || !email || !password || !tipoUsuario) {
      toast.warning('Preencha todos os campos.');
      return;
    }
    setLoadingCreate(true);
    try {
      await criarUsuario({
        nome,
        email,
        password,
        tipoUsuario,
      });

      toast.success('Usuário criado com sucesso!');
      setOpen(false);

      // limpar formulário
      setNome('');
      setEmail('');
      setPassword('');
      setTipoUsuario('USER');
      onCreated();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao criar usuário');
    }
    setLoadingCreate(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <User />
          Cadastrar Usuário
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo usuário</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Nome"
            className="placeholder:text-sm"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            placeholder="Email"
            className="placeholder:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Senha"
            className="placeholder:text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Select simples (sem Radix Select por enquanto) */}
          <select
            className="border-input bg-background h-9 rounded-md border px-3 text-sm"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="USER">Usuário</option>
            <option value="ESTAGIARIO">Estagiário</option>
            <option value="JORNALISTA">Jornalista</option>
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Administrador</option>
          </select>

          <Button onClick={handleCreateUser}>
            {loadingCreate ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              'Criar Usuário'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserDialog;
