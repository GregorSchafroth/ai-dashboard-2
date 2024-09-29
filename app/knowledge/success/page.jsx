import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const SuccessPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl mb-4'>Operation Completed Successfully!</h1>
      <p className='mb-4'>Your changes have been saved.</p>
      <Card className='m-4 p-4'>
        <CardContent className='p-0'>
          <div>
            🇬🇧 To see the changes, go back to "Knowledge" and reload the
            website. If you don't see it change right away, wait a minute and
            then try again. It might take a moment to process the update. <br />
            🇩🇪 Um die Änderungen zu sehen, gehen Sie zurück zu "Knowledge" und
            laden Sie die Website neu. Wenn Sie die Änderung nicht sofort sehen,
            warten Sie eine Minute und versuchen Sie es dann erneut. Es kann
            einen Moment dauern, bis das Update verarbeitet ist.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
