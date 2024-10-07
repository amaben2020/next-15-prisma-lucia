import Link from 'next/link';
import LoginForm from './LoginForm';
import signupImage from '@/app/assets/login-image.jpg';
import Image from 'next/image';

export const metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-3xl"> Login</h1>
          <LoginForm />

          <Link href="/signup" className="block text-center hover:underline">
            Don&apos;t have an account, sign up
          </Link>
        </div>

        <Image src={signupImage} alt="" className="w-1/2 hidden md:block" />
      </div>
    </main>
  );
}
