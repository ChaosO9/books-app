'use client';

import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken'; // make sure to install jsonwebtoken package
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(WrappedComponent) {
    return function WithAuthComponent(props) {
        const router = useRouter();
        const { token } = parseCookies();

        useEffect(() => {
            if (!token) {
                router.push('/login');
                return;
            }

            async function verifyJWT() {
                try {
                    const res = await fetch('/api/verifyjwt', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token,
                        }),
                    });

                    if (res.status !== 200) {
                        const { message } = await res.json();
                        throw new Error(message);
                    }
                    return;
                } catch (err) {
                    console.log(err);
                    console.log(token);
                    return router.push('/login');
                }
            }
            verifyJWT();
        }, []);

        return <WrappedComponent {...props} />;
    };
}
