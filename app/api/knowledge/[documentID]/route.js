import { NextResponse } from 'next/server';
import { deleteDocument } from '@/services/knowledgeServices';

export async function DELETE(request, { params }) {
  try {
    const { documentID } = params;
    console.log('documentID1', documentID)
    if (documentID) {
      await deleteDocument(documentID);
    }
    console.log('documentID2', documentID)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in deleteDocument:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
