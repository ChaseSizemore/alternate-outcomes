import { NextResponse } from 'next/server';
import { db } from '@/utils/firestore';
import { getDocs, collection, query, where } from '@firebase/firestore';

import { NextApiRequest } from 'next';

export const GET = async (req: Request, res: Response) => {
  try {
    const url = new URL(req.url as string, `http://${(req.headers as any).host}`);
    let name = url.searchParams.get('name')?.toLowerCase();
    const colRef = await collection(db, 'bootcamps');
    const q = await query(colRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    const data: any = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return NextResponse.json(data);
  } catch (e) {
    console.error('Error getting document: ', e);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return NextResponse.json({ error: 'No body provided' }, { status: 400 });
    }
    const data = await streamToJson(req.body);

    return NextResponse.json({ message: 'success' });
  } catch (e) {
    console.error('Error adding document: ', e);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};

async function streamToJson(stream: ReadableStream): Promise<any> {
  const reader = stream.getReader();
  const decoder = new TextDecoder('utf-8');
  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }
  return JSON.parse(result);
}
