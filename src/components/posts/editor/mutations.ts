import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { submitPost } from './actions';
import { useToast } from '@/hooks/use-toast';
import { PostsPage } from '@/lib/types';

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = {
        queryKey: ['post-feed', 'for-you'],
      };

      await queryClient.cancelQueries(queryFilter);

      //modifying multi feeds at once
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        // putting the new posts first
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        }
      );

      // incase we cancel the query before the first page has loaded
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        variant: 'default',
        description: 'Post created',
      });
    },
    onError(error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Failed to post, please try again',
      });
    },
  });

  return mutation;
}
