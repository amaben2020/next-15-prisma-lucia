'use client';
import { PostData } from '@/lib/types';
import { useState } from 'react';
import DeletePostDialog from './DeletePostDialog';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';

interface PostMoreButton {
  post: PostData;
  className?: string;
}

const PostMoreButton = ({ post, className }: PostMoreButton) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className={className}>
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <span className="flex items-center gap-3 text-destructive">
              Delete <Trash2 className="size-4" />
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showDeleteDialog && (
        <DeletePostDialog
          post={post}
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
    </>
  );
};

export default PostMoreButton;
