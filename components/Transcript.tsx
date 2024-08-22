import React from 'react';
import data from '@/data/getTranscriptDialog4.json';

const Transcript = () => {
  return (
    <div className='h-full w-full p-4 flex flex-col bg-white border-l border-gray-200'>
      <div className='flex-1 overflow-auto'>
        <div className='flex flex-col gap-4'>
          {data
            .filter((item) => item.type === 'text' || item.type === 'request')
            .map((item, key) => (
              <div
                key={key}
                className={`flex ${
                  item.type === 'request' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-lg px-4 py-2 rounded-lg text-sm ${
                    item.type === 'request'
                      ? 'bg-blue-500 text-white ml-8'
                      : 'bg-gray-100 text-gray-800 mr-8'
                  }`}
                >
                  <div>
                    {item.type === 'text' &&
                      item.payload.payload?.slate?.content[0].children[0].text}
                  </div>
                  <div>
                    {item.type === 'request' &&
                    typeof item.payload?.payload?.query === 'string'
                      ? item.payload.payload.query
                      : null}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transcript;
