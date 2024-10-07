import UserButton from '@/components/UserButton';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap px-5 gap-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Bugbook
        </Link>

        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
