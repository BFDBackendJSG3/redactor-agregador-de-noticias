import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CreateUserDialog from '@/components/admin/CreateUserDialog';
import EditUserDialog from '@/components/admin/EditUserDialog';
import { listarUsuarios, deletarUsuario } from '@/services/users-service';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
    if (!confirm('Deseja realmente excluir este usuário?')) return;

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
              // ADMIN → vermelho; EDITOR → roxo; JORNALISTA → azul; ESTAGIÁRIO → amarelo; USER → cinza
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
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={loadingDelete === u.id}
                  onClick={() => handleDelete(u.id)}
                >
                  {loadingDelete === u.id ? 'Excluindo...' : 'Excluir'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
