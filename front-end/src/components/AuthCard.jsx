import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

function AuthCard({ name, description, buttonName, routeTo }) {
  const navigete = useNavigate();
  const location = useLocation();

  return (
    <card className="bg-card flex min-h-110 w-full max-w-4xl flex-col rounded-xl border shadow-sm md:flex-row">
      <div className="flex basis-[40%] flex-col items-center justify-center gap-3 rounded-t-xl rounded-b-[60px] bg-emerald-600 p-4 md:basis-[50%] md:rounded-l-xl md:rounded-r-[100px]">
        <h1 className="text-2xl font-semibold md:text-3xl">Olá, Bem Vindo!</h1>
        <p className="text-foreground text-sm">{description}</p>
        <Button onClick={() => navigete(routeTo)} variant="outline" size="sm">
          {buttonName}
        </Button>
      </div>
      <div className="flex basis-[60%] flex-col p-4 md:basis-[50%] md:justify-center">
        <div className="mb-6 flex flex-col gap-3">
          <h1 className="text-center text-xl font-semibold md:text-2xl">
            {name}
          </h1>
          <Input placeholder="Email" className="placeholder:text-sm" />
          <Input
            placeholder="Senha"
            type="password"
            className="placeholder:text-sm"
          />
          <Button className="w-full">{name}</Button>
        </div>
        {location.pathname === '/login' && (
          <Dialog>
            <DialogTrigger>
              <a className="text-muted-foreground text-center text-sm hover:text-blue-400 hover:underline">
                Esqueceu a senha?
              </a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3 text-center">
                  Redefinir senha
                </DialogTitle>
                <DialogDescription>
                  Insira o endereço de e-mail cadastrado da sua conta de usuário
                  e enviaremos um link para redefinir sua senha.
                </DialogDescription>
              </DialogHeader>
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <Input />
              </div>
              <Button>Recuperar Acesso</Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </card>
  );
}

export default AuthCard;
