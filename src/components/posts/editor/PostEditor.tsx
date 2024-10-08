'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { submitPost } from './actions';
import { useSession } from '@/app/(main)/SessionProvider';
import UserAvatar from '@/components/UserAvatar';
import './styles.css';
import { useSubmitPostMutation } from './mutations';
import LoadingButton from '@/components/LoadingButton';

const PostEditor = () => {
  const { user } = useSession();
  const mutation = useSubmitPostMutation();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: 'Whats crack-a-lacking?',
      }),
    ],
  });
  const input =
    editor?.getText({
      blockSeparator: '\n',
    }) || '';

  async function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        // clear editor
        editor?.commands.clearContent();
      },
    });
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3"
        />
        <LoadingButton loading={mutation.isPending} onClick={onSubmit}>
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
