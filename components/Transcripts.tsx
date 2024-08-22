import { ScrollArea } from '@/components/ui/scroll-area';
import data from '@/data/fetchProjectTranscripts.json';

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'

type Repo = {
  name: string
  stargazers_count: number
}


const Transcripts = async () => {
  return (
    <ScrollArea className='h-max w-full p-2'>
      <div className='flex flex-col gap-2 pt-0'>
        {data.map((item) => (
          <div
            key={item._id}
            className='flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
          >
            <div className='flex w-full flex-col gap-1 truncate'>
              <div className='flex items-center'>
                <div className='font-semibold'>ID: {item._id}</div>
                <div className='ml-auto text-xs text-muted-foreground'>
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
              <div className='text-xs font-medium text-gray-500'>
                Browser: {item.browser} | Device: {item.device} | OS: {item.os}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Transcripts;
