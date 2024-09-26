import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import logo from '../img/logo2.png';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = async ({ projectId }) => {
  return (
    <header className='bg-red-100'>
      <div className='flex flex-row items-center justify-between m-4'>
        {/* Left-aligned section */}
        <div className='flex flex-row items-center gap-4'>
          <Link href='/' className='flex flex-row gap-2 items-center'>
            <Image
              src={logo}
              alt='Swiss AI Automation'
              height={40}
              className='object-contain'
            />
            <h1 className='items-center gap-2 text-2xl sm:text-4xl truncate'>
              Dashboard
            </h1>
          </Link>

          {/* Transcripts and Analytics buttons */}
          <SignedIn>
            <div className='flex flex-row gap-4'>
              <Link
                href={`/transcripts/${projectId}`}
                className={buttonVariants({ variant: 'ghost' })}
              >
                Transcripts
              </Link>
              <Link
                href={`/analytics/${projectId}`}
                className={buttonVariants({ variant: 'ghost' })}
              >
                Analytics
              </Link>
              <Link
                href={`/knowledge/${projectId}`}
                className={buttonVariants({ variant: 'ghost' })}
              >
                Knowledge
              </Link>
              
            </div>
          </SignedIn>
        </div>

        {/* Right-aligned section (user buttons) */}
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
