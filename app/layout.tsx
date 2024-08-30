import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Dashboard',
  description: 'Presenting AI transcripts and more on a dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning={true}>
        <Head>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body
          className={`${inter.className} flex flex-col h-screen overflow-hidden`}
        >
          <Header />
          <hr />
          <main className='flex-grow overflow-auto'>{children}</main>
          <hr />
          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
