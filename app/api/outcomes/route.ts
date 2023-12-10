import { NextResponse } from 'next/server';
import { db } from '@/app/utils/firestore';
import { getDocs, collection, addDoc, doc } from '@firebase/firestore';
import { streamToJson } from '@/app/utils/utilityFunctions';

export const GET = async (req: Request, res: Response) => {
  try {
    const colRef = await collection(db, 'outcomes');
    const q = await getDocs(colRef);
    const data: any = [];
    q.forEach((doc) => {
      data.push(doc.data());
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return NextResponse.json({ error: 'No body provided' }, { status: 400 });
    }
    const data = await streamToJson(req.body);
    data.createdAt = new Date().toISOString();

    const docRef = await addDoc(collection(db, 'outcomes'), data);
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (e) {
    console.error('Error adding document: ', e);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};
