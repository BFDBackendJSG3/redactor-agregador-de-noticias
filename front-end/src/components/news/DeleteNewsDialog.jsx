import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

function DeleteNewsDialog({
  item,
  handleDelete,
  deleteNewsMutation,
  isMobile,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive" className="flex-1">
          <Trash2 className={`h-4 w-4 ${isMobile ? 'mr-1' : ''}`} />
          {isMobile && 'Excluir'}
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
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteNewsDialog;
