import AuthCard from '@/components/AuthCard';

function Login() {
  return (
    <div className="flex justify-center md:py-10">
      <AuthCard
        name="Login"
        description="Ainda não possui uma conta?"
        buttonName="Registrar-se"
        routeTo="/cadastro"
      />
    </div>
  );
}

export default Login;
