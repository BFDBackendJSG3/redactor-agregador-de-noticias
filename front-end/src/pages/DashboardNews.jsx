import { useState } from 'react';
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Newspaper,
  Edit,
  Trash2,
  Eye,
  Loader2Icon,
  CheckCircle,
} from 'lucide-react';
import {
  criarNoticiaManual,
  listarNoticiasAdmin,
  deletarNoticia,
  aprovarNoticia,
} from '@/services/news-service';
import { THEMES } from '@/constants/news-themes';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function DashboardNews() {
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    conteudo: '',
    temaPrincipalId: '',
    municipios: [],
  });

  const queryClient = useQueryClient();

  // Buscar notícias para administração
  const { data: newsData, isLoading: isLoadingNews } = useQuery({
    queryKey: ['admin-news'],
    queryFn: () => listarNoticiasAdmin(1, { status: 'aguardando_revisao' }),
  });

  const news = newsData?.data || [];
  console.log(news);

  // Mutation para criar notícia
  const createNewsMutation = useMutation({
    mutationFn: criarNoticiaManual,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-news']);
      setFormData({
        titulo: '',
        subtitulo: '',
        conteudo: '',
        temaPrincipalId: '',
        municipios: [],
      });
      toast.success('Notícia criada com sucesso!');
    },
    onError: (error) => {
      toast.error(
        `Erro ao criar notícia: ${error.response?.data?.error || error.message}`
      );
    },
  });

  // Mutation para deletar notícia
  const deleteNewsMutation = useMutation({
    mutationFn: deletarNoticia,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-news']);
      toast.success('Notícia deletada com sucesso!');
    },
    onError: (error) => {
      toast.error(
        `Erro ao deletar notícia: ${error.response?.data?.error || error.message}`
      );
    },
  });

  // Mutation para aprovar notícia
  const approveNewsMutation = useMutation({
    mutationFn: aprovarNoticia,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-news']);
      toast.success('Notícia aprovada com sucesso!');
    },
    onError: (error) => {
      toast.error(
        `Erro ao aprovar notícia: ${error.response?.data?.error || error.message}`
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.conteudo || !formData.temaPrincipalId) {
      toast.warning('Título, conteúdo e tema são obrigatórios');
      return;
    }
    createNewsMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    deleteNewsMutation.mutate(id);
  };

  const handleApprove = (id) => {
    approveNewsMutation.mutate(id);
  };

  const getStatusBadge = (status) => {
    const variants = {
      publicado: 'bg-green-100 text-green-800',
      aguardando_revisao: 'bg-yellow-100 text-yellow-800',
      rascunho: 'bg-gray-100 text-gray-800',
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8 md:py-10">
      <div>
        <h1 className="mb-6 text-xl font-semibold">Criar Notícia</h1>
        <Card>
          <CardContent className="pt-6">
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
                  <SelectTrigger>
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
                disabled={createNewsMutation.isLoading}
                className="w-full"
              >
                <Newspaper className="mr-2 h-4 w-4" />
                {createNewsMutation.isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  'Criar Notícia'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-semibold">Administrar Notícias</h2>
        {isLoadingNews ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.titulo}</CardTitle>
                      <div className="mt-2 flex gap-2">
                        <Badge className={getStatusBadge(item.status)}>
                          {item.status === 'publicado'
                            ? 'Publicado'
                            : item.status === 'aguardando_revisao'
                              ? 'Aguardando Revisão'
                              : 'Rascunho'}
                        </Badge>
                        <Badge variant="outline">
                          {item.temaPrincipal?.nome}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {item.status === 'aguardando_revisao' && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(item.id)}
                          disabled={approveNewsMutation.isLoading}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-md text-center">
                              Excluir Notícia
                            </DialogTitle>
                            <DialogDescription>{item.titulo}</DialogDescription>
                          </DialogHeader>
                          <div className="flex gap-3">
                            <DialogClose asChild>
                              <Button className="flex-1" variant="outline">
                                Cancelar
                              </Button>
                            </DialogClose>

                            <Button
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleDelete(item.id)}
                              disabled={deleteNewsMutation.isLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                              Excluir
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm">{item.conteudo}</p>
                  <div className="mt-2 text-xs">
                    Criado em:{' '}
                    {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardNews;
