import Image from 'next/image';
import React from 'react';
import avatarPlaceholder from '@/app/assets/avatar-placeholder.png';
import { cn } from '@/lib/utils';

interface AvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, size, className }: AvatarProps) => {
  return (
    <Image
      src={avatarUrl || avatarPlaceholder}
      alt=""
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        'aspect-square h-fit flex-none rounded-full bg-secondary object-cover',
        className
      )}
    />
  );
};

export default UserAvatar;
