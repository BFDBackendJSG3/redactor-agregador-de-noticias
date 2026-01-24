import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper, Loader2Icon } from 'lucide-react';
import { THEMES } from '@/constants/news-themes';

function CreateNewsForm({
  formData,
  setFormData,
  handleSubmit,
  createNewsMutation,
}) {
  return (
    <div className="w-full lg:w-[80%] xl:w-[70%]">
      <h1 className="mb-6 text-xl font-semibold">Criar Notícia</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm">Título *</label>
              <Input
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                className="placeholder:text-sm"
                placeholder="Digite o título da notícia"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Subtítulo</label>
              <Input
                value={formData.subtitulo}
                onChange={(e) =>
                  setFormData({ ...formData, subtitulo: e.target.value })
                }
                className="placeholder:text-sm"
                placeholder="Digite o subtítulo (opcional)"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Tema *</label>
              <Select
                value={formData.temaPrincipalId}
                onValueChange={(value) =>
                  setFormData({ ...formData, temaPrincipalId: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tema" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {Object.entries(THEMES).map(([key, id]) => (
                    <SelectItem key={id} value={id.toString()}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-sm">URL da Imagem</label>
              <Input
                value={formData.imagemUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imagemUrl: e.target.value })
                }
                className="placeholder:text-sm"
                placeholder="Digite a URL da imagem (opcional)"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">
                Municípios (separados por vírgula)
              </label>
              <Input
                value={formData.municipios}
                onChange={(e) =>
                  setFormData({ ...formData, municipios: e.target.value })
                }
                className="placeholder:text-sm"
                placeholder="Ex: João Pessoa, Campina Grande (opcional)"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Conteúdo *</label>
              <Textarea
                value={formData.conteudo}
                onChange={(e) =>
                  setFormData({ ...formData, conteudo: e.target.value })
                }
                placeholder="Digite o conteúdo da notícia"
                className="placeholder:text-sm"
                rows={6}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={createNewsMutation.isPending}
              className="w-full"
            >
              {createNewsMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <>
                  <Newspaper className="h-4 w-4" />
                  Criar Notícia
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateNewsForm;
