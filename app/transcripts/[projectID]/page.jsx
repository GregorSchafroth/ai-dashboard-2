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
          <Transcripts projectID={params.projectID} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className='!overflow-auto'>
          <Transcript />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
