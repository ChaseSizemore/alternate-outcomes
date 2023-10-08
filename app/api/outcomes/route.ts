import { NextResponse } from "next/server";
import {db} from "@/utils/firebaseAdmin"


export const GET = async (req: Request, res: Response) => {
    const docs = await db.collection('').get();
    const data = docs.docs.map(doc => doc.data());
    return NextResponse.json(data[0]);
    
}

export const POST = async (req: Request, res: Response) => {
    const { body } = req;
    const doc = db.collection('').doc('');
    await doc.set(body);
}