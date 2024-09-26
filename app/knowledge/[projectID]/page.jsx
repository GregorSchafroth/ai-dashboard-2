import React from 'react';
import { getKnowledgeBase } from '@/services/knowledgeServices';
import EditableKnowledgeBase from '@/components/EditableKnowledgeBase';
import { Card, CardContent } from '@/components/ui/card';

const KnowledgePage = async () => {
  let initialData = { chunks: [] };
  let documentID = null;
  let error = null;

  try {
    const result = await getKnowledgeBase();
    initialData = result.data;
    documentID = result.documentID;
  } catch (err) {
    console.error('Failed to load knowledge base:', err);
    error = err.message;
  }

  if (error) {
    return (
      <div className='p-4'>
        <h2 className='text-2xl m-2 truncate'>Error Loading Knowledge Base</h2>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  const faqs = initialData.chunks.map((chunk) => {
    const [question, answer] = chunk.content.split('; ');
    return {
      question: question.split(': ')[1],
      answer: answer.split(': ')[1],
    };
  });

  return (
    <div className='flex flex-col'>
      <h2 className='text-2xl p-4'>Questions and Answers</h2>
      <Card className='flex-grow m-4 p-4'>
        <CardContent className='p-0'>
          <div>
            🇬🇧 Please ensure to save your changes by clicking the "Save FAQs"
            button below. <br />
            🇩🇪 Bitte stellen Sie sicher, dass Sie Ihre Änderungen speichern,
            indem Sie unten auf den Knopf „Save FAQs“ klicken.
          </div>
        </CardContent>
      </Card>
      <div className='flex-grow overflow-hidden p-4'>
        <EditableKnowledgeBase
          initialFaqs={faqs}
          initialDocumentID={documentID}
        />
      </div>
    </div>
  );
};

export default KnowledgePage;
