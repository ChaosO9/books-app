import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {
    const { token } = await req.json();
    try {
        jwt.verify(token, process.env.SECRET_KEY);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
};
