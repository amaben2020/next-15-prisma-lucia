import prisma from '@/lib/prisma';
import { getUserDataSelect } from '@/lib/types';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import { PageProps } from '../../../../../.next/types/app/layout';
import { validateRequest } from '@/auth';
import TrendsSidebar from '@/components/TrendsSidebar';

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
      <div className="flex w-full min-w-0 space-y-5"></div>

      <TrendsSidebar />
    </main>
  );
};

export default Page;

interface UserProfileProps {
  user: any;
}

async function UserProfile({}) {}
