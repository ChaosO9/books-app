// pages/api/books/index.js
import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export const GET = async (req, res) => {
    console.log('GET USER DETAIL');
    let user_id = '';
    try {
        const header = headers().get('authorization');
        const token = (header && header.split(' ')[1]) || undefined;
        jwt.verify(token, process.env.SECRET_KEY);
        user_id = jwt.decode(token).id;
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 401,
            },
        );
    }

    try {
        const isUserExist = await prisma.user.findUnique({
            where: {
                id: user_id,
            },
        });
        if (isUserExist.id !== user_id) {
            return NextResponse.json(
                {
                    message: 'You are not allowed to view the account',
                },
                {
                    status: 404,
                },
            );
        } else if (!isUserExist) {
            return NextResponse.json(
                {
                    message: 'The user does not exist',
                },
                {
                    status: 404,
                },
            );
        }

        const { password, ...userWithoutPassword } = isUserExist;

        return NextResponse.json(
            {
                message: 'User found',
                user: {
                    ...userWithoutPassword,
                },
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            },
        );
    }
};

export const DELETE = async (req, res) => {
    console.log('DELETE BOOK');
    try {
        const header = headers().get('authorization');
        const token = (header && header.split(' ')[1]) || undefined;
        jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 401,
            },
        );
    }

    try {
        const { book_id } = res.params;

        const isBookExist = await prisma.books.findUnique({
            where: {
                isbn: book_id,
            },
        });
        if (!isBookExist) {
            return NextResponse.json(
                {
                    message: 'The book does not exist',
                    errors: {
                        isbn: ['Thhe book does not exist'],
                    },
                },
                {
                    status: 404,
                },
            );
        }

        const deleteBook = await prisma.books.delete({
            where: {
                isbn: book_id,
            },
        });

        return NextResponse.json(
            {
                message: 'Book deleted',
                book: {
                    ...isBookExist,
                },
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            },
        );
    }
};
