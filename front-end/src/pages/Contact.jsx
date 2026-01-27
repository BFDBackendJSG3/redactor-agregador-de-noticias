import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function Contact() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardTitle className="text-center text-xl">Contato</CardTitle>
        <CardDescription className="px-3 text-center">
          Seu contato é muito importante para nós. Preencha os campos abaixo
          corretamente, que entraremos em contato o mais rápido possível.{' '}
        </CardDescription>
        <CardContent className="text-muted-foreground space-y-3 text-sm">
          <div>
            <p>Nome Completo:</p>
            <Input />
          </div>
          <div className="flex flex-col space-y-3 md:flex-row md:gap-4 md:space-y-0">
            <div className="w-full md:basis-[65%]">
              <p>Email:</p>
              <Input type="email" />
            </div>
            <div className="w-full md:basis-[35%]">
              <p>Telefone:</p>
              <Input />
            </div>
          </div>
          <div>
            <p>Cidade:</p>
            <Input />
          </div>
          <div>
            <p>Mensagem:</p>
            <Textarea className="min-h-30" />
          </div>
          <Button aria-label="Submit" className="mt-2 w-full">
            Enviar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Contact;
