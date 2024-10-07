import { Metadata } from 'next';
import React from 'react';
import signupImage from '@/app/assets/signup-image.jpg';
import Image from 'next/image';
import Link from 'next/link';
import SignupForm from './SignupForm';

export const metadata: Metadata = {
  title: 'Signup',
};

const Signup = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="shadow-2xl flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold"> Signup to bugbook</h1>

            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> can find a
              friend
            </p>
          </div>
          <div className="space-y-5">
            <SignupForm />
            <Link href="/login"> Already have an account? Login </Link>
          </div>
        </div>

        <Image src={signupImage} alt="" className="w-1/2 hidden md:block" />
      </div>
    </main>
  );
};

export default Signup;
