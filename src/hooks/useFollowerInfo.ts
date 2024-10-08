import { FollowerInfo } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useFollowerInfo(
  userId: string,
  initialState: FollowerInfo
) {
  const query = useQuery({
    // each user id has its follower key
    queryKey: ['follower-info', userId],
    queryFn: async () => {
      const res = await axios.get(`/api/users/${userId}/followers`);
      return res.data;
    },
    initialData: initialState,
    // doesnt revalidate automatically unless asked to
    staleTime: Infinity,
  });

  return query;
}
