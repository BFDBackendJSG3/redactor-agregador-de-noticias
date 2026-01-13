import { useAuth } from '@/contexts/AuthContext';
import CreateUserDialog from '@/components/admin/CreateUserDialog';

function AdminUsers() {
  const { user } = useAuth();

  // Proteção de rota
  if (user?.tipoUsuario !== 'ADMIN') {
    return <p>Acesso negado</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Administração de Usuários</h1>

      <CreateUserDialog />
    </div>
  );
}

export default AdminUsers;
