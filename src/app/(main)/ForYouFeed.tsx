//@ts-nocheck
'use client';

import Post from '@/components/posts/Post';
import kyInstance from '@/lib/ky';
import { PostData } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Mail } from 'lucide-react';
import axios from 'axios';
const ForYouFeed = () => {
  const query = useQuery<PostData & { user: any }>({
    queryKey: ['post-feed', 'for-you'],
    queryFn: async () => {
      const response = axios.get('/api/posts/for-you');

      return (await response).data;
    },
  });

  if (query.status === 'pending') {
    return <Loader2 className="animate-spin mx-auto" />;
  }
  if (query.status === 'error') {
    return <p>An error occured</p>;
  }

  return (
    <div className="space-y-5">
      {query.data.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default ForYouFeed;
