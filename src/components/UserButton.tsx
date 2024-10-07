'use client';
import { useSession } from '@/app/(main)/SessionProvider';
import React from 'react';
import { DropdownMenu } from './ui/dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import UserAvatar from './UserAvatar';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';

interface UserButtonProps {
  className?: string;
}

const UserButton = ({ className }: UserButtonProps) => {
  const { user } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="">
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white rounded-md h-fit p-3 border space-y-4">
        <DropdownMenuLabel className="text-bold">
          Logged in as @{user.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem className="flex gap-x-5 items-center">
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
