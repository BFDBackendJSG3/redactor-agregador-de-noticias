import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function Login() {
  return (
    <div className="flex justify-center md:py-10">
      <div className="bg-card flex min-h-110 w-full max-w-4xl flex-col rounded-xl border shadow-sm md:flex-row">
        <div className="flex basis-[40%] flex-col items-center justify-center gap-3 rounded-t-xl rounded-b-[60px] bg-green-700 p-4 md:basis-[50%] md:rounded-l-xl md:rounded-r-[100px]">
          <h1 className="text-2xl font-semibold md:text-3xl">
            Olá, Bem Vindo!
          </h1>
          <p className="text-foreground text-sm">Ainda não tem conta?</p>
          <Button variant="outline" size="sm">
            Registrar-se
          </Button>
        </div>
        <div className="flex basis-[60%] flex-col p-4 md:basis-[50%] md:justify-center">
          <div className="mb-6 flex flex-col gap-3">
            <h1 className="text-center text-xl font-semibold md:text-2xl">
              Login
            </h1>
            <Input placeholder="Email" className="placeholder:text-sm" />
            <Input
              placeholder="Senha"
              type="password"
              className="placeholder:text-sm"
            />
            <Button className="w-full">Login</Button>
          </div>
          <p className="text-muted-foreground text-center text-sm">
            Esqueceu a senha?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
