import { NextResponse } from 'next/server';
import { destroyCookie } from 'nookies';

export const DELETE = async (req, res) => {
    console.log('DELETE USER AUTH');

    try {
        destroyCookie(req, res, 'token');
        return NextResponse.json(
            {
                message: 'User logged out successfully',
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
