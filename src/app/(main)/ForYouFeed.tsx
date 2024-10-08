//@ts-nocheck
'use client';

import Post from '@/components/posts/Post';
import kyInstance from '@/lib/ky';
import { PostData } from '@/lib/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Loader2, Mail } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import InfiniteScrollContainer from '@/components/InfiniteScrollContainer';
import PostsLoadingSkeleton from '../api/posts/PostsLoadingSkeleton';
const ForYouFeed = () => {
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<PostData & { user: any }>({
    queryKey: ['post-feed', 'for-you'],
    queryFn: async ({ pageParam }) => {
      const response = axios.get('/api/posts/for-you', {
        params: {
          ...(pageParam
            ? {
                searchParams: { cursor: pageParam },
              }
            : {}),
        },
      });
      return (await response).data;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === 'pending') {
    return <PostsLoadingSkeleton />;
  }
  if (status === 'success' && !posts.length && !hasNextPage) {
    return <p>No Posts</p>;
  }
  if (status === 'error') {
    return <p>An error occured</p>;
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="animate-spin mx-auto my-3" />}
    </InfiniteScrollContainer>
  );
};

export default ForYouFeed;
