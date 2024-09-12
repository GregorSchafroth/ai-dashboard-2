import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getTranscripts } from '@/services/transcriptServices';

const Transcripts = async ({ projectID, transcriptID }) => {
  let data = [];

  try {
    data = await getTranscripts(projectID);
  } catch (error) {
    console.error('Failed to load transcripts:', error);
  }
  return (
    <>
      <h2 className='text-2xl m-2 truncate'>All Transcripts ({data.length})</h2>
      <hr />
      <ScrollArea className='h-max w-full p-2'>
        <div className='flex flex-col gap-2 pt-0'>
          {data.map((item) => (
            <Link
              key={item._id}
              href={`/transcripts/${projectID}/${item._id}`}
              className={`flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent ${
                item._id === transcriptID && 'bg-muted'
              }`}
            >
              <div className='flex w-full flex-col gap-1 truncate'>
                <div className='flex items-center'>
                  <div className='font-semibold'>ID: {item._id}</div>
                  <div className='ml-auto text-xs text-muted-foreground'>
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className='text-xs font-medium text-gray-500'>
                  Browser: {item.browser} | Device: {item.device} | OS:{' '}
                  {item.os}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default Transcripts;
