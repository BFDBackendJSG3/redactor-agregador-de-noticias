import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CreateUserDialog from '@/components/admin/CreateUserDialog';
import EditUserDialog from '@/components/admin/EditUserDialog';
import { listarUsuarios, deletarUsuario } from '@/services/users-service';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

function AdminUsers() {
  const { user } = useAuth();
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  if (user?.tipoUsuario !== 'ADMIN') {
    return <p>Acesso negado</p>;
  }

  <input
    type="text"
    placeholder="Buscar por nome ou email"
    className="border-input bg-background mb-4 h-9 w-full max-w-sm rounded-md border px-3 text-sm"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />;

  async function carregarUsuarios() {
    const data = await listarUsuarios();
    setUsuarios(data);
  }

  async function handleDelete(id) {
    try {
      setLoadingDelete(id);
      await deletarUsuario(id);
      toast.success('Usuário Excluído.');
      carregarUsuarios();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao deletar usuário');
    } finally {
      setLoadingDelete(null);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nome} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Administração de Usuários</h1>

      <CreateUserDialog />

      <table className="mt-6 w-full border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.nome}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold text-white ${
                    u.tipoUsuario === 'ADMIN'
                      ? 'bg-red-600'
                      : u.tipoUsuario === 'EDITOR'
                        ? 'bg-purple-600'
                        : u.tipoUsuario === 'JORNALISTA'
                          ? 'bg-blue-600'
                          : u.tipoUsuario === 'ESTAGIARIO'
                            ? 'bg-yellow-600'
                            : 'bg-gray-600'
                  }`}
                >
                  {u.tipoUsuario}
                </span>
              </td>
              <td className="flex gap-2 p-2">
                <EditUserDialog usuario={u} onUpdated={carregarUsuarios} />
                {/* Dialog de exclusao de user (Precisa componentizar depois) */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Excluir
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="text-md text-center">
                      Deseja Excluír Usuário {user.nome}?
                    </DialogTitle>
                    <div className="flex gap-3">
                      <DialogClose asChild>
                        <Button className="flex-1" variant="outline">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={loadingDelete === u.id}
                        onClick={() => handleDelete(u.id)}
                        className="flex-1"
                        variant="destructive"
                      >
                        {loadingDelete === u.id ? (
                          <Loader2Icon className="animate-spin" />
                        ) : (
                          'Excluir'
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
