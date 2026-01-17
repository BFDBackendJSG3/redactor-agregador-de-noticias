import { useAuth } from '@/contexts/AuthContext';

function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <div>HelloWorld</div>
    </div>
  );
}

export default Home;
