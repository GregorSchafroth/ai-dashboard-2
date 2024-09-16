import { currentUser } from '@clerk/nextjs/server';

async function getApiKey() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  let apiKey = '';

  if (userEmail === 'gregor.schafroth@gmail.com') {
    apiKey = process.env.FT_VOICEFLOW_API_KEY;
  } else if (userEmail === 'antonio@flyingteachers.com') {
    apiKey = process.env.FT_VOICEFLOW_API_KEY;
  } else if (userEmail === 'support@flyingteachers.com') {
    apiKey = process.env.FT_VOICEFLOW_API_KEY;
  } else if (userEmail === 'sollkrash@gmail.com') {
    apiKey = process.env.HD_VOICEFLOW_API_KEY;
  } else if (userEmail === 'leitung@hallodeutschschule.ch') {
    apiKey = process.env.HD_VOICEFLOW_API_KEY;
  }

  return apiKey;
}

export async function getTranscripts(projectID) {
  const apiKey = await getApiKey();

  const url = `https://api.voiceflow.com/v2/transcripts/${projectID}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Failed to fetch transcripts');
  }
  return res.json();
}

export async function getTranscript(projectID, transcriptID) {
  const apiKey = await getApiKey();

  const url = `https://api.voiceflow.com/v2/transcripts/${projectID}/${transcriptID}`;

  console.log('url', url);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Failed to fetch transcripts');
  }
  return res.json();
}
