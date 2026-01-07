import AuthCard from '@/components/AuthCard';

function Register() {
  return (
    <div className="flex justify-center md:py-10">
      <AuthCard
        name="Criar Conta"
        buttonName="Logar-se"
        description="Já possui uma conta?"
        routeTo="/login"
      />
    </div>
  );
}

export default Register;
