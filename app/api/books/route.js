// pages/api/books/index.js
import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
export const GET = async (req, res) => {
    try {
        // const headers = req.headers;
        // const authHeader = req.headers.authorization;
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
        const page = (req.query && Number(req.query.page)) || 1;
        const limit = (req.query && Number(req.query.limit)) || 5;
        const skip = (page - 1) * limit;

        // Fetch paginated books from the database
        const books = await prisma.books.findMany({
            take: limit,
            skip: skip,
        });

        // Fetch total books count from the database
        const total = await prisma.books.count();

        const response = {
            current_page: page,
            data: books,
            first_page_url: `/api/books?page=1`,
            from: skip + 1,
            last_page: Math.ceil(total / limit),
            last_page_url: `/api/books?page=${Math.ceil(total / limit)}`,
            next_page_url:
                page < Math.ceil(total / limit)
                    ? `/api/books?page=${page + 1}`
                    : null,
            path: '/api/books',
            per_page: limit,
            prev_page_url: page > 1 ? `/api/books?page=${page - 1}` : null,
            to: skip + books.length,
            total: total,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
