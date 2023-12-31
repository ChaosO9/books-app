import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {
    const { email, password } = await req.json();
    console.log(email);
    console.log(password);

    // Find the user in the database
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 },
        );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 },
        );
    }

    // Generate a token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: '1d',
    });

    console.log(token);

    return NextResponse.json(
        {
            message: 'User authenticated',
            token,
        },
        { status: 200 },
    );
};
