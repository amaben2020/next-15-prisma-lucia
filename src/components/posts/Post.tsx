'use client';
import { Post as PostData } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import UserAvatar from '../UserAvatar';
import { formatRelativeDate } from '@/lib/utils';
import { useSession } from '@/app/(main)/SessionProvider';
import PostMoreButton from './PostMoreButton';

interface PostPops {
  post: PostData & { user: any };
}

const Post = ({ post }: PostPops) => {
  const { user } = useSession();
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm group/post">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>

          <div>
            <Link
              className="block font-medium hover:underline"
              href={`/users/${post.user.username}`}
            >
              {post.user.displayName}
            </Link>

            <Link
              className="block text-sm hover:underline text-muted-foreground"
              href={`/users/${post.user.username}`}
            >
              {formatRelativeDate(new Date(post.createdAt))}
            </Link>
          </div>
        </div>
        {post.userId === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>

      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
};

export default Post;
