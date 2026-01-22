import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { Edit, Trash2, Loader2Icon, CheckCircle } from 'lucide-react';
import { NEWS_STATUS } from '@/constants/news-status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function ListNews({
  isLoadingNews,
  handleDelete,
  handleApprove,
  approveNewsMutation,
  deleteNewsMutation,
  news,
}) {
  return (
    <div className="w-full md:w-[80%] lg:w-[70%]">
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
                      <Badge className={NEWS_STATUS[item.status]?.className}>
                        {NEWS_STATUS[item.status]?.label || item.status}
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
                        disabled={approveNewsMutation.isPending}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
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
                            disabled={deleteNewsMutation.isPending}
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
  );
}

export default ListNews;
