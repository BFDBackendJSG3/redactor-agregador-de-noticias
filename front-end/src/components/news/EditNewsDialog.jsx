import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Edit, Loader2Icon, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { atualizarNoticia } from '@/services/news-service';
import { THEMES } from '@/constants/news-themes';
import { useMutation } from '@tanstack/react-query';

function EditNewsDialog({
  item,
  onSuccess,
  isMobile,
  className,
  isEstagiario,
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    conteudo: '',
    temaPrincipalId: '',
    imagemUrl: '',
    municipios: '',
  });

  // Inicializar form com dados da notícia
  useEffect(() => {
    if (item) {
      const municipiosString =
        item.municipios?.map((m) => m.nome).join(', ') || '';

      setFormData({
        titulo: item.titulo || '',
        subtitulo: item.subtitulo || '',
        conteudo: item.conteudo || '',
        temaPrincipalId: item.temaPrincipalId?.toString() || '',
        imagemUrl: item.imagemUrl || '',
        municipios: municipiosString,
      });
    }
  }, [item]);

  // Mutation para atualizar
  const updateNewsMutation = useMutation({
    mutationFn: (payload) => atualizarNoticia(item.id, payload),
    onSuccess: () => {
      setOpen(false);
      onSuccess?.();
      toast.success('Notícia atualizada com sucesso!');
    },
    onError: (error) => {
      toast.error(
        `Erro ao atualizar notícia: ${error.response?.data?.error || error.message}`
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.conteudo || !formData.temaPrincipalId) {
      toast.warning('Título, conteúdo e tema são obrigatórios');
      return;
    }

    const processedMunicipios = formData.municipios
      ? formData.municipios
          .split(',')
          .map((m) => m.trim())
          .filter((m) => m)
      : [];

    const payload = {
      titulo: formData.titulo,
      subtitulo: formData.subtitulo || null,
      conteudo: formData.conteudo,
      temaPrincipalId: formData.temaPrincipalId,
      imagemUrl: formData.imagemUrl || null,
      municipios: processedMunicipios,
    };

    updateNewsMutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={`${isMobile ? 'flex-1' : ''} ${className || ''}`}
        >
          <Edit className="h-4 w-4" />
          {isMobile || (isEstagiario && 'Editar')}
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[50%]! sm:max-w-[90%]! md:max-w-[70%]! lg:max-w-[60%]! xl:max-w-225!">
        <DialogHeader>
          <DialogTitle className="text-center">Editar Notícia</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Título *</label>
            <Input
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              placeholder="Digite o título"
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
              <SelectContent className="bg-background" position="popper">
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
              placeholder="Digite o conteúdo"
              className="min-h-50"
              rows={6}
              required
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateNewsMutation.isPending}
              className="flex-1"
            >
              {updateNewsMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditNewsDialog;
