import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

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

export async function getKnowledgeBase() {
  try {
    const apiKey = await getApiKey();
    if (!apiKey) {
      throw new Error('API key not found for the current user');
    }

    const response = await fetch(
      'https://api.voiceflow.com/v1/knowledge-base/docs?page=1&limit=100',
      {
        headers: {
          Authorization: apiKey,
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const documentList = await response.json();
    const faqDocument = documentList.data.find(
      (doc) => doc.data.name === 'FAQs'
    );

    if (!faqDocument) {
      // Instead of throwing an error, return an empty data structure
      return {
        data: {
          chunks: [],
          name: 'FAQs',
          projectID: documentList.data[0]?.projectID || null, // Use the first document's projectID if available
        },
        documentID: null,
      };
    }

    const documentID = faqDocument.documentID;

    const faqResponse = await fetch(
      `https://api.voiceflow.com/v1/knowledge-base/docs/${documentID}`,
      {
        headers: {
          Authorization: apiKey,
          accept: 'application/json',
        },
      }
    );

    if (!faqResponse.ok) {
      throw new Error(
        `API request failed: ${faqResponse.status} ${faqResponse.statusText}`
      );
    }

    const data = await faqResponse.json();
    return { data, documentID };
  } catch (error) {
    console.error('Error in getKnowledgeBase:', error.message);
    throw error;
  }
}

export async function deleteDocument(documentID) {
  if (!documentID){
    return true
  }
  try {
    const apiKey = await getApiKey();
    if (!apiKey) {
      throw new Error('API key not found for the current user');
    }

    const response = await fetch(
      `https://api.voiceflow.com/v1/knowledge-base/docs/${documentID}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Delete request failed: ${response.status} ${response.statusText}`
      );
    }

    return true;
  } catch (error) {
    console.error('Error in deleteDocument:', error.message);
    throw error;
  }
}

export async function updateKnowledgeBase(updatedFAQs) {
  try {
    const apiKey = await getApiKey();
    if (!apiKey) {
      throw new Error('API key not found for the current user');
    }

    const response = await fetch(
      'https://api.voiceflow.com/v1/knowledge-base/docs/upload/table',
      {
        method: 'POST',
        headers: {
          Authorization: apiKey,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            schema: {
              searchableFields: ['question', 'answer'],
              metadataFields: ['tags'],
            },
            name: 'FAQs',
            items: updatedFAQs.map(({ question, answer }) => ({
              question,
              answer,
            })),
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Update request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in updateKnowledgeBase:', error.message);
    throw error;
  }
}
