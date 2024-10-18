import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getTranscript } from '@/services/transcriptServices';

const extractContent = (item) => {
  if (item.type === 'text' && item.payload?.payload?.slate?.content) {
    return item.payload.payload.slate.content.map(block =>
      block.children.map(child => {
        if (child.type === 'link') {
          return `<a href="${child.url}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">${child.children[0].text}</a>`;
        }
        if (child.fontWeight === '700') {
          return `**${child.text}**`;
        }
        return child.text;
      }).join('')
    ).join('\n');
  } else if (item.type === 'request') {
    if (item.payload?.payload?.query) {
      return item.payload.payload.query;
    } else if (item.payload?.payload?.label) {
      return item.payload.payload.label;
    } else if (item.payload?.type === 'launch') {
      return 'Conversation started';
    }
  }
  return '';
};

const Transcript = async ({ projectID, transcriptID }) => {
  let data = [];
  try {
    data = await getTranscript(projectID, transcriptID);
  } catch (error) {
    console.error('Failed to load transcripts:', error);
  }
  
  return (
    <>
      <h2 className='text-2xl m-2 truncate'>
        Selected Transcript
      </h2>
      <hr />
      <div className='h-full w-full p-4 flex flex-col bg-white border-l border-gray-200'>
        <div className='flex-1 overflow-auto'>
          <div className='flex flex-col gap-4'>
            {data.map((item, key) => {
              const content = extractContent(item);
              const isUser = item.type === 'request';
              if (!content) return null;
              return (
                <div
                  key={key}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg px-4 py-2 rounded-lg text-sm ${
                      isUser
                        ? 'bg-blue-500 text-white ml-8'
                        : 'bg-gray-100 text-gray-800 mr-8'
                    }`}
                  >
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transcript;