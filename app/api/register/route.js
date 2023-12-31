import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import bcrypt from 'bcryptjs';

function getDateTimeWithMicroseconds() {
    let hrTime = process.hrtime();
    let microseconds = Math.floor(hrTime[1] / 1000);
    let date = new Date();
    let dateString = date.toISOString().slice(0, -1); // remove the 'Z'
    return `${dateString}.${microseconds}Z`;
}

export const POST = async (req, res) => {
    if (req.method === 'POST') {
        console.log('POST REQUEST');
        const { name, email, password, confirm_password } = await req.json();
        const timeNow = getDateTimeWithMicroseconds();

        if (!name || !email || !password || !confirm_password) {
            console.log('All fields are required!');
            return NextResponse.json(
                {
                    message: 'All fields are required!',
                    errors: {
                        name: ['The name field is required'],
                        email: ['The email field is required'],
                        password: ['The password field is required'],
                        password_confirmation: [
                            'The password confirmation field is required',
                        ],
                    },
                },
                {
                    status: 422,
                },
            );
        }

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email: email },
            });

            if (existingUser) {
                console.log('User Exist');
                return NextResponse.json(
                    {
                        message: 'User already exists',
                        errors: {
                            name: [''],
                            email: ['This account/email already exist'],
                            password: [''],
                            password_confirmation: [''],
                        },
                    },
                    {
                        status: 422,
                    },
                );
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    created_at: timeNow,
                    updated_at: timeNow,
                    email_verified_at: timeNow,
                },
            });

            const getUserId = await prisma.user
                .findUnique({
                    where: { email: email },
                })
                .then((user) => {
                    return user.id;
                });

            return NextResponse.json(
                {
                    message: 'User created',
                    user: {
                        id: getUserId,
                        email,
                        password: hashedPassword,
                        created_at: timeNow,
                        updated_at: timeNow,
                        email_verified_at: timeNow,
                    },
                },
                {
                    status: 200,
                },
            );
        } catch (error) {
            console.log('Server Error');
            return NextResponse.json(
                { message: error.message },
                {
                    status: 500,
                },
            );
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
