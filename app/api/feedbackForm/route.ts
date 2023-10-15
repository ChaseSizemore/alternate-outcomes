import { db } from '@/utils/firestore';
import { collection, addDoc } from '@firebase/firestore';
import { NextResponse } from 'next/server';
import { streamToJson } from '@/utils/utilityFunctions';

/**
 * Handles POST requests to the feedback form endpoint. Called from feedbackForm route/page.
 * @param req - The request object. Request object body must contain a JSON object containing the feedback form data.
 * @param res - The response object.
 * @returns A JSON response indicating success or failure.
 */

export const POST = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return NextResponse.json({ error: 'No body provided' }, { status: 400 });
    }
    const data = await streamToJson(req.body);
    data.createdAt = new Date().toISOString();
    const docRef = await addDoc(collection(db, 'feedbackForm'), data);

    return NextResponse.json({ message: 'success' });
  } catch (e) {
    console.error('Error adding document: ', e);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};
