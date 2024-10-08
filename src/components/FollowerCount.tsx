'use client';
// when you need hooks, move it to another compt and ensure you import in the server compt

import useFollowerInfo from '@/hooks/useFollowerInfo';
import { FollowerInfo } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowerCount = ({ userId, initialState }: FollowerCountProps) => {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Followers: {'  '} {formatNumber(data.followers)}
    </span>
  );
};

export default FollowerCount;
