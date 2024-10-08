import { PostData } from '@/lib/types';
import { useDeleteMutation } from './mutations';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import LoadingButton from '../LoadingButton';
import { Button } from '../ui/button';

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

const DeletePostDialog = ({ post, open, onClose }: DeletePostDialogProps) => {
  const mutation = useDeleteMutation();
  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogHeader>
        <DialogTitle>Delete Post?</DialogTitle>
        <DialogDescription>
          Are you sure you wanna delete post?{' '}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <LoadingButton
          variant="destructive"
          onClick={() =>
            mutation.mutate(post.id, {
              onSuccess: onClose,
            })
          }
          loading={mutation.isPending}
        >
          Delete
        </LoadingButton>

        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeletePostDialog;
