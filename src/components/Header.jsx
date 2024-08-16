import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button'; // Ensure this path is correct

const Header = () => {
  return (
    <div>
      <div className='flex bg-slate-400'>
        <div className='flex justify-between bg-red-200 items-center w-full p-4'>
          <h1 className='text-2xl font-bold'>MyShop</h1>
          <input
            className='w-1/2 p-2 rounded-lg border border-gray-300'
            placeholder='Search for products'
          />
          <Link href="/cart">
            <span className='text-lg font-medium text-blue-600 cursor-pointer hover:underline'>Cart</span>
          </Link>

          <div className='flex items-center gap-4'>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10'
                  },
                  variables: {
                    colorPrimary: '#ff7000'
                  }
                }}
              />
            </SignedIn>

            <SignedOut>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
              
              <Link href="/sign-up">
                <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border px-4 py-3 shadow-none'>
                  Sign Up
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
