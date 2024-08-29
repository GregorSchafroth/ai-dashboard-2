import Transcript from '@/components/Transcript';
import Transcripts from '@/components/Transcripts';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function Home({ params }) {
  
  return (
    <>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className='!overflow-auto'>
          <h2 className='text-2xl m-2 truncate'>All Transcripts</h2><hr />
          <Transcripts projectID={params.projectID} transcriptID={params.transcriptID} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className='!overflow-auto'>
          <h2 className='text-2xl m-2 truncate'>Selected Transcript</h2><hr />
          <Transcript projectID={params.projectID} transcriptID={params.transcriptID} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
