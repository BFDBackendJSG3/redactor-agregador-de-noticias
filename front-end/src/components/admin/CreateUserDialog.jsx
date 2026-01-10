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

function CreateUserDialog() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('USER');
  const [open, setOpen] = useState(false);

  async function handleCreateUser() {
    if (!nome || !email || !password || !tipoUsuario) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      await criarUsuario({
        nome,
        email,
        password,
        tipoUsuario,
      });

      alert('Usuário criado com sucesso!');
      setOpen(false);

      // limpar formulário
      setNome('');
      setEmail('');
      setPassword('');
      setTipoUsuario('USER');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao criar usuário');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar Usuário</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo usuário</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Senha"
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
            <option value="ADMIN">Administrador</option>
          </select>

          <Button onClick={handleCreateUser}>
            Criar Usuário
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserDialog;