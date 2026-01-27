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
import { generatePages } from '@/utils/generatePages';
import PaginationIcons from '@/components/PaginationIcons';
import { useAuth } from '@/contexts/AuthContext';

function DashboardNews() {
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    conteudo: '',
    temaPrincipalId: '',
    municipios: '',
    imagemUrl: '',
  });

  const queryClient = useQueryClient();

  // Buscar notícias para administração
  const { data: newsData, isLoading: isLoadingNews } = useQuery({
    queryKey: ['admin-news', page],
    queryFn: () => listarNoticiasAdmin(page, { status: 'aguardando_revisao' }),
    keepPreviousData: true,
  });

  const news = newsData?.data || [];
  const meta = newsData?.meta;
  const totalPages = meta?.totalPages || 1;
  const pages = generatePages(page, totalPages);

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
        municipios: '',
        imagemUrl: '',
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
    const payload = {
      ...formData,
      subtitulo: formData.subtitulo || null,
      imagemUrl: formData.imagemUrl || null,
      municipios: formData.municipios
        ? formData.municipios
            .split(',')
            .map((m) => m.trim())
            .filter((m) => m)
        : [],
    };
    createNewsMutation.mutate(payload);
  };

  const handleDelete = (id) => {
    deleteNewsMutation.mutate(id);
  };

  const handleApprove = (noticia) => {
    // Garante que municipios seja sempre array de nomes
    let municipiosArr = [];
    if (Array.isArray(noticia.municipios)) {
      municipiosArr = noticia.municipios.map((m) =>
        typeof m === 'string' ? m : m.nome
      );
    } else if (typeof noticia.municipios === 'string') {
      municipiosArr = noticia.municipios
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);
    }
    approveNewsMutation.mutate({
      id: noticia.id,
      noticiaAtual: { ...noticia, municipios: municipiosArr },
    });
  };

  const handleInvalidateQueries = () => {
    queryClient.invalidateQueries(['admin-news']);
  };

  if (!user || user.tipoUsuario === 'USER') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Acesso não autorizado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {user.tipoUsuario !== 'ESTAGIARIO' && (
        <CreateNewsForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          createNewsMutation={createNewsMutation}
        />
      )}
      <ListNews
        isLoadingNews={isLoadingNews}
        handleApprove={handleApprove}
        handleDelete={handleDelete}
        approveNewsMutation={approveNewsMutation}
        deleteNewsMutation={deleteNewsMutation}
        news={news}
        user={user.tipoUsuario}
        onSuccess={handleInvalidateQueries}
      />
      {totalPages > 1 && (
        <PaginationIcons
          page={page}
          pages={pages}
          setPage={setPage}
          metaData={meta}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default DashboardNews;
