'use client';
import { useToast } from '@/hooks/use-toast';
import useFollowerInfo from '@/hooks/useFollowerInfo';
import { FollowerInfo } from '@/lib/types';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import axios from 'axios';

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowButton = ({ userId, initialState }: FollowButtonProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data } = useFollowerInfo(userId, initialState);
  console.log('data is followed', data);
  const queryKey: QueryKey = ['follower-info', userId];

  const deleteFollower = async (userId: string) => {
    return await axios.delete(`/api/users/${userId}/followers`);
  };

  const followUser = async (userId: string) => {
    return await axios.post(`/api/users/${userId}/followers`);
  };

  // optimistic update
  const { mutate } = useMutation({
    mutationFn: async () =>
      data.isFollowedByUser
        ? await deleteFollower(userId)
        : await followUser(userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      // rollback to prev data state
      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));

      return { previousState };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      });
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      variant={data.isFollowedByUser ? 'secondary' : 'default'}
    >
      {data.isFollowedByUser ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
