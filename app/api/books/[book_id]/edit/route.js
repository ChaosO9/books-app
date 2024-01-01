// pages/api/books/index.js
import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {
    console.log('POST BOOK EDIT');
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
        console.log(
            isbn,
            title,
            subtitle,
            author,
            published,
            publisher,
            pages,
            description,
            website,
        );

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
        } else if (isBookExist && isBookExist.isbn !== isbn) {
            return NextResponse.json(
                {
                    message: 'The ISBN number is exist on another book',
                    errors: {
                        isbn: ['This ISBN number is exist on another book'],
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

        const book = await prisma.books.update({
            where: {
                isbn,
            },
            data: {
                isbn,
                title,
                subtitle,
                author,
                published: formattedDate,
                publisher,
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
                    published: formattedDate,
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
