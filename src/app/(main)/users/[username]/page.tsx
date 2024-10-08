import prisma from '@/lib/prisma';
import { FollowerInfo, getUserDataSelect, UserData } from '@/lib/types';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import { PageProps } from '../../../../../.next/types/app/layout';
import { validateRequest } from '@/auth';
import TrendsSidebar from '@/components/TrendsSidebar';
import UserAvatar from '@/components/UserAvatar';
import { formatDate } from 'date-fns';
import { formatNumber } from '@/lib/utils';
import FollowerCount from '@/components/FollowerCount';
import { Button } from '@/components/ui/button';
import FollowButton from '@/components/FollowButton';
import UserPosts from './UserPosts';

// so we make the request once: Deduplication
const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive',
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) notFound();
  return user;
});

export async function generateMetadata({ params: { username } }: PageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

const Page = async ({ params: { username } }: PageProps) => {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser)
    return <p className="text-destructive">You are not authorized</p>;

  const user = await getUser(username, loggedInUser.id);
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="flex flex-col w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUserId={loggedInUser.id} />

        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h2 className="text-center text-2xl font-bold">
            {user.displayName}&apos; posts
          </h2>
          <UserPosts userId={user.id} />
        </div>
      </div>

      <TrendsSidebar />
    </main>
  );
};

export default Page;

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId
    ),
  };

  return (
    <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <UserAvatar
        size={250}
        avatarUrl={user.avatarUrl}
        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
      />

      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
          <div>Member since {formatDate(user.createdAt, 'MMM d, yyyy')}</div>
          Posts: <span>{formatNumber(user._count.post)}</span>
        </div>

        <div>
          <FollowerCount userId={user.id} initialState={followerInfo} />
        </div>

        {user.id === loggedInUserId ? (
          <Button>Edit Profile</Button>
        ) : (
          <FollowButton userId={user.id} initialState={followerInfo} />
        )}

        {user.bio === loggedInUserId && (
          <div>
            <hr />
            <div className="overflow-hidden whitespace-pre-line break-words">
              {user.bio}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
