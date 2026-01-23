import { useState } from 'react';
import { toast } from 'sonner';
import {
  criarNoticiaManual,
  listarNoticiasAdmin,
  deletarNoticia,
  aprovarNoticia,
} from '@/services/news-service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CreateNewsForm from '@/components/news/CreateNewsForm';
import ListNews from '@/components/news/ListNews';

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

  const handleInvalidateQueries = () => {
    queryClient.invalidateQueries(['admin-news']);
  };

  return (
    <div className="flex flex-col items-center space-y-8 md:py-10">
      <CreateNewsForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        createNewsMutation={createNewsMutation}
      />
      <ListNews
        isLoadingNews={isLoadingNews}
        handleApprove={handleApprove}
        handleDelete={handleDelete}
        approveNewsMutation={approveNewsMutation}
        deleteNewsMutation={deleteNewsMutation}
        news={news}
        onSuccess={handleInvalidateQueries}
      />
    </div>
  );
}

export default DashboardNews;
