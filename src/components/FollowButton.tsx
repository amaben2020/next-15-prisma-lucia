'use client';
import { useToast } from '@/hooks/use-toast';
import useFollowerInfo from '@/hooks/useFollowerInfo';
import { FollowerInfo } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import axios from 'axios';

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowButton = ({ userId, initialState }: FollowButtonProps) => {
  // const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data } = useFollowerInfo(userId, initialState);

  const { mutate } = useMutation({
    mutationFn: async () =>
      data.isFollowedByUser
        ? await axios.delete(`/api/users/${userId}/followers`)
        : await axios.post(`/api/users/${userId}/followers`),
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
