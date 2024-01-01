// pages/api/books/index.js
import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {
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

    const {
        isbn,
        title,
        subtitle,
        author,
        published,
        publisher,
        pages,
        description,
        website,
    } = await req.json();

    if (
        !isbn ||
        !title ||
        !subtitle ||
        !author ||
        !published ||
        !publisher ||
        !pages ||
        !description ||
        !website
    ) {
        console.log('All fields are required!');
        return NextResponse.json(
            {
                message: 'All fields are required!',
                errors: {
                    isbn: ['The name field is required'],
                    title: ['The email field is required'],
                    subtitle: ['The password field is required'],
                    author: ['The password confirmation field is required'],
                    published: ['The published field is required'],
                    published: ['The publisher field is required'],
                    pages: ['The pages field is required'],
                    description: ['The description field is required'],
                    website: ['The website field is required'],
                },
            },
            {
                status: 422,
            },
        );
    }

    const isBookExist = await prisma.books.findFirst({
        where: {
            isbn,
        },
    });
    if (isBookExist) {
        return NextResponse.json(
            {
                message: 'The ISBN number is exist',
                errors: {
                    isbn: ['This ISBN number is exist'],
                },
            },
            {
                status: 422,
            },
        );
    }
    const date = new Date(published);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} 00:00:00`;

    const book = await prisma.books.create({
        data: {
            isbn,
            title,
            subtitle,
            author,
            published: formattedDate,
            publisher,
            published,
            pages: Number(pages),
            description,
            website,
        },
    });

    return NextResponse.json(
        {
            message: 'Book created',
            book: {
                isbn,
                title,
                subtitle,
                author,
                published,
                publisher,
                pages,
                description,
                website,
            },
        },
        {
            status: 200,
        },
    );
};
