
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link';
import { Button } from "@/components/ui/button"


export default async function Home() {

  const user = await currentUser();
  const userEmail = user.externalAccounts[0].emailAddress

  let dashLink = '/unauthorized'

  if (userEmail === 'gregor.schafroth@gmail.com'){
    dashLink = '/unauthorized'
  } else if (userEmail === 'sollkrash@gmail.com'){
    dashLink = '/transcripts/6661676863f440c855dad674'
  } else if (userEmail === 'leitung@hallodeutschschule.ch'){
    dashLink = '/transcripts/6661676863f440c855dad674'
  }

  return (
    <>
    <h2 className='text-2xl p-4'>
      Links
    </h2>
    <Link href={dashLink} className='p-4'>
      <Button>Transcripts</Button>
    </Link>
    </>
  );
}


