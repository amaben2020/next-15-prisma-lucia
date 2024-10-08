import { useToast } from '@/hooks/use-toast';
import { PostData, PostsPage } from '@/lib/types';
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { deletePost } from './actions';

export function useDeleteMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const router = useRouter();

  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    // deletedPost is the stuff returned from the mutation function
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters = { queryKey: ['post-feed'] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((p) => p.id !== deletedPost.id),
            })),
          };
        }
      );

      toast({
        description: 'Post deleted',
      });
      if (pathname === `/posts/${deletedPost.id}`) {
        router.push(`/users/${deletedPost.user.username}`);
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Failed to delete',
      });
    },
  });

  return mutation;
}
