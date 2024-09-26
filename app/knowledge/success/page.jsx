import React from 'react';
import Link from 'next/link';

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Operation Completed Successfully!</h1>
      <p className="mb-4">Your changes have been saved.</p>
    </div>
  );
};

export default SuccessPage;