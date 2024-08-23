export async function getTranscripts(projectID) {

  const url = `https://api.voiceflow.com/v2/transcripts/${projectID}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.VOICEFLOW_API_KEY,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Failed to fetch transcripts');
  }
  return res.json();
}

export async function getTranscript(projectID, transcriptID) {

  // const url = `https://api.voiceflow.com/v2/transcripts/${projectID}/${transcriptID}`;
  const url = `https://api.voiceflow.com/v2/transcripts/6661676863f440c855dad674/66c84610f8ef6c030bb2280e`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.VOICEFLOW_API_KEY,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Failed to fetch transcripts');
  }
  return res.json();
}