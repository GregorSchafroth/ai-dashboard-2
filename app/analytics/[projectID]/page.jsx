import Analytics from '@/components/Analytics'
import { getAnalytics } from '@/services/analyticsServices'

const page = async ({ params }) => {
  
  let data = [];

  try {
    data = await getAnalytics(params.projectID);
  } catch (error) {
    console.error('Failed to load transcripts:', error);
  }

  console.log('DATA', data);
  
  return (
    <Analytics />
  )
}
export default page