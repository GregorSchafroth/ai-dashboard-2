import { NextResponse } from 'next/server';
import { updateKnowledgeBase } from '@/services/knowledgeServices';

export async function POST(request) {
  try {
    const updatedFAQs = await request.json();
    const data = await updateKnowledgeBase(updatedFAQs);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in updateKnowledgeBase:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}