import Image from 'next/image';
import logo from '../img/logo.png';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <header className='bg-red-100'>
      <div className='flex items-center justify-between m-4'>
        <Link href='/'>
          <h1 className='text-4xl flex items-center  gap-2'>
            <Image src={logo} alt='Swiss AI Automation' height={40} />
            Swiss AI Automation Dashboard
          </h1>
        </Link>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: '40px',
                  height: '40px',
                },
                userButtonBox: {
                  width: '40px',
                  height: '40px',
                },
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <div>
            <Link
              href='sign-in'
              className='text-gray-300 hover:text-white mr-4'
            >
              Sign In
            </Link>
            <Link
              href='sign-up'
              className='text-gray-300 hover:text-white mr-4'
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
