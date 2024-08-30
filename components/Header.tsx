import Image from 'next/image';
import logo from '../img/logo2.png';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <header className='bg-red-100'>
      <div className='flex flex-row items-center justify-between m-4'>
        <Link href='/' className='flex flex-row gap-2 items-center'>
          <Image
            src={logo}
            alt='Swiss AI Automation'
            height={40}
            // width={40}
            className='object-contain'
          />
           <h1 className='items-center gap-2 text-2xl sm:text-4xl truncate'>
            Dashboard
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
          <div className='flex'>
            <Link href='sign-in' className='hover:text-gray-600 mr-4'>
              Sign In
            </Link>

            <Link href='sign-up' className='hover:text-gray-600 mr-4'>
              Sign Up
            </Link>
          </div>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
