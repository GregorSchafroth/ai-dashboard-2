import Transcript from '@/components/Transcript';
import Transcripts from '@/components/Transcripts';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function Home() {
  return (
    <>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className='!overflow-auto'>
          <h2 className='text-2xl m-2'>All Transcripts</h2><hr />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <h2 className='text-2xl m-2'>Selected Transcript</h2><hr />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
