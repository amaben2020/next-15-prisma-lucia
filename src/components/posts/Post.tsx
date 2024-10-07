import { Post as PostData } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import UserAvatar from '../UserAvatar';
import { formatRelativeDate } from '@/lib/utils';

interface PostPops {
  post: PostData & { user: any };
}

const Post = ({ post }: PostPops) => {
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
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
            {formatRelativeDate(post.createdAt)}
          </Link>
        </div>
      </div>

      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
};

export default Post;
