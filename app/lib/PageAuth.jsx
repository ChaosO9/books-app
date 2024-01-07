'use client';

import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken'; // make sure to install jsonwebtoken package
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchBaseURL } from './fetchBaseURL';

export default function withAuth(WrappedComponent) {
    return function WithAuthComponent(props) {
        const router = useRouter();
        const { token } = parseCookies();

        useEffect(() => {
            if (!token) {
                // console.log('Harusnya ke menu login');
                router.replace('/login');
                return;
            }

            async function verifyJWT() {
                try {
                    const res = await fetch(fetchBaseURL + '/api/verifyjwt', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
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
