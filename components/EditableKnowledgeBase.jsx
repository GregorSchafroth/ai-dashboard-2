'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AutoResizeTextarea = ({ value, onChange, ...props }) => {
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      rows={1}
      style={{ overflow: 'hidden' }}
      {...props}
    />
  );
};

const EditableKnowledgeBase = ({ initialFaqs = [], initialDocumentID }) => {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [documentID] = useState(initialDocumentID);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Delete the old document
      if (documentID) {
        const deleteResponse = await fetch(`/api/knowledge/${documentID}`, {
          method: 'DELETE',
        });

        if (!deleteResponse.ok) {
          throw new Error(
            `Delete request failed: ${deleteResponse.status} ${deleteResponse.statusText}`
          );
        }
      }

      // Create a new document with updated FAQs
      const updateResponse = await fetch('/api/knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faqs),
      });

      if (!updateResponse.ok) {
        throw new Error(
          `Update request failed: ${updateResponse.status} ${updateResponse.statusText}`
        );
      }

      router.push('/knowledge/success');
    } catch (err) {
      console.error('Error updating FAQs:', err);
      setError('Failed to update FAQs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const addNewQuestion = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeQuestion = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  if (!Array.isArray(faqs)) {
    return <div>Error: FAQ data is not in the expected format.</div>;
  }

  return (
    <div className='flex flex-col h-full space-y-4'>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <Card className='flex-grow'>
        <CardContent className='p-0'>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Answer</TableHead>
                  <TableHead className='w-[120px]'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.map((faq, index) => (
                  <TableRow key={index} className='align-top'>
                    <TableCell>
                      <Input
                        value={faq.question}
                        onChange={(e) =>
                          handleInputChange(index, 'question', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <AutoResizeTextarea
                        value={faq.answer}
                        onChange={(e) =>
                          handleInputChange(index, 'answer', e.target.value)
                        }
                        className='w-full min-h-[38px] resize-none'
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='destructive'
                        onClick={() => removeQuestion(index)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
        <CardFooter className='p-4'>
          <Button onClick={addNewQuestion} variant='secondary'>
            Add New Question
          </Button>
        </CardFooter>
      </Card>
      <div>
        <Button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save FAQs'}
        </Button>
      </div>
    </div>
  );
};

export default EditableKnowledgeBase;
