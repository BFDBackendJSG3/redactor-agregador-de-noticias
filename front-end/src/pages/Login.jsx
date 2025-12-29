import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function Login() {
  return (
    <div className="flex justify-center md:py-10">
      <div className="bg-card flex min-h-110 w-full max-w-4xl justify-between rounded-xl border shadow-sm">
        <div className="flex basis-[50%] flex-col items-center justify-center space-y-3 rounded-l-xl rounded-r-[100px] bg-green-700 p-4">
          <h1 className="text-3xl font-semibold">Olá, Bem Vindo!</h1>
          <p className="text-foreground text-sm">Ainda não tem conta?</p>
          <Button variant="outline">Registrar-se</Button>
        </div>
        <div className="flex basis-[50%] flex-col justify-center gap-3 pr-8 pl-8">
          <h1 className="text-center text-2xl font-semibold">Login</h1>
          <Input placeholder="Email" />
          <Input placeholder="Senha" type="password" />
          <p className="text-foreground text-center text-sm">
            Esqueceu a senha?
          </p>
          <Button className="w-full">Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
