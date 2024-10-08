'use client';
import { useSession } from '@/app/(main)/SessionProvider';
import React from 'react';
import { DropdownMenu } from './ui/dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import UserAvatar from './UserAvatar';
import Link from 'next/link';
import {
  Check,
  CheckIcon,
  LogOutIcon,
  Monitor,
  Moon,
  Sun,
  UserIcon,
} from 'lucide-react';
import { logout } from '@/app/(auth)/actions';
import { useTheme } from 'next-themes';
import { useQueryClient } from '@tanstack/react-query';

interface UserButtonProps {
  className?: string;
}

const UserButton = ({ className }: UserButtonProps) => {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();

  const queryClient = useQueryClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex-none rounded-full">
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

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-x-5 items-center"
          onClick={() => {
            queryClient.clear();
            logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>

      <div>
        <button onClick={() => setTheme('system')}>
          <Monitor className="mr-2 size-4" />
          {theme === 'system' && <Check className="mr-2 size-4" />}
        </button>

        <button onClick={() => setTheme('light')}>
          <Sun className="mr-2 size-4" />
          {theme === 'light' && <CheckIcon className="mr-2 size-4" />}
        </button>

        <button onClick={() => setTheme('dark')}>
          <Moon className="mr-2 size-4" />
          {theme === 'dark' && <CheckIcon className="mr-2 size-4" />}
        </button>
      </div>
    </DropdownMenu>
  );
};

export default UserButton;
