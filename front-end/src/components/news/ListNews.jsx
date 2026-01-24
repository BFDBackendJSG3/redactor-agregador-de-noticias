import { Button } from '@/components/ui/button';
import { Loader2Icon, CheckCircle } from 'lucide-react';
import { NEWS_STATUS } from '@/constants/news-status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DeleteNewsDialog from './DeleteNewsDialog';
import EditNewsDialog from './EditNewsDialog';

function ListNews({
  isLoadingNews,
  handleDelete,
  handleApprove,
  approveNewsMutation,
  deleteNewsMutation,
  news,
  onSuccess,
}) {
  return (
    <div className="w-full lg:w-[80%] xl:w-[70%]">
      <h2 className="mb-6 text-xl font-semibold">Administrar Notícias</h2>

      {isLoadingNews ? (
        <div className="flex w-full justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  {/* Info principal */}
                  <div>
                    <CardTitle className="text-base sm:text-lg">
                      {item.titulo}
                    </CardTitle>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className={NEWS_STATUS[item.status]?.className}>
                        {NEWS_STATUS[item.status]?.label || item.status}
                      </Badge>

                      <Badge variant="outline">
                        {item.temaPrincipal?.nome}
                      </Badge>
                    </div>
                  </div>

                  {/* Ações Desktop */}
                  <div className="hidden gap-2 md:flex">
                    {item.status === 'aguardando_revisao' && (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(item)}
                        disabled={approveNewsMutation.isPending}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}

                    <EditNewsDialog item={item} onSuccess={onSuccess} />
                    <DeleteNewsDialog
                      item={item}
                      deleteNewsMutation={deleteNewsMutation}
                      handleDelete={handleDelete}
                      isMobile={false}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="line-clamp-2 text-sm">{item.conteudo}</p>

                <div className="text-muted-foreground mt-2 text-xs">
                  Importado em:{' '}
                  {new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(new Date(item.createdAt))}
                </div>

                {/* Ações Mobile */}
                <div className="mt-4 flex gap-1 md:hidden">
                  {item.status === 'aguardando_revisao' && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(item)}
                      disabled={approveNewsMutation.isPending}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Aprovar
                    </Button>
                  )}
                  <EditNewsDialog
                    item={item}
                    onSuccess={onSuccess}
                    isMobile={true}
                  />
                  <DeleteNewsDialog
                    item={item}
                    deleteNewsMutation={deleteNewsMutation}
                    handleDelete={handleDelete}
                    isMobile={true}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListNews;
