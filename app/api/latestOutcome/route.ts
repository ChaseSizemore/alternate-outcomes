import { NextResponse } from 'next/server';
import { db } from '@/utils/firestore';
import { getDocs, collection, query, orderBy } from '@firebase/firestore';

export const GET = async (req: Request, res: Response) => {
  try {
    const colRef = collection(db, 'outcomes');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());
    return NextResponse.json(data[0], { headers: { 'Cache-Control': 'no-store' } });

  } catch (e) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};
