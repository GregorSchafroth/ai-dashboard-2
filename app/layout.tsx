import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';
import { currentUser } from '@clerk/nextjs/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Dashboard',
  description: 'Presenting AI transcripts and more on a dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  let projectId = '/unauthorized';

  if (userEmail === 'gregor.schafroth@gmail.com') {
    projectId = '66652e6d0c5aef4fa4bc0f22';
  } else if (userEmail === 'antonio@flyingteachers.com') {
    projectId = '66652e6d0c5aef4fa4bc0f22';
  } else if (userEmail === 'support@flyingteachers.com') {
    projectId = '66652e6d0c5aef4fa4bc0f22';
  } else if (userEmail === 'sollkrash@gmail.com') {
    projectId = '6661676863f440c855dad674';
  } else if (userEmail === 'leitung@hallodeutschschule.ch') {
    projectId = '6661676863f440c855dad674';
  }

  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning={true}>
        <Head>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body
          className={`${inter.className} flex flex-col h-screen overflow-hidden`}
        >
          <Header projectId={projectId} />
          <hr />
          <main className='flex-grow overflow-auto'>{children}</main>
          <hr />
          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
