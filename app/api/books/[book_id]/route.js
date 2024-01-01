// pages/api/books/index.js
import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export const GET = async (req, res) => {
    console.log('GET BOOK DETAIL');
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

        return NextResponse.json(
            {
                message: 'Book found',
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
