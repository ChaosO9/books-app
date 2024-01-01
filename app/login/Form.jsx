'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCookie } from 'nookies';
import Link from 'next/link';
import Alert from '../components/login-signup/alert';
export default function Form() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const loginPayload = {
        email,
        password,
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginPayload),
        });

        const { message, token } = await res.json();

        if (res.status == 200) {
            setCookie(null, 'token', token, {
                maxAge: 1 * 24 * 60 * 60,
                path: '/',
            });
            router.replace('/');
        } else {
            setAlertMessage(message);
            setIsAlert(true);
        }
    }

    return (
        <>
            <div className="flex flex-wrap content-center justify-center rounded-r-md bg-white w-24rem h-40rem sm:order-2 md:order-none">
                <div className="w-72">
                    {/* Heading */}
                    <a href="/" className="flex justify-center pb-5 md:mr-24">
                        <img
                            src="./nerdy-man.webp"
                            className="h-12 mr-3"
                            alt="Nerdy Library Logo"
                        />
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                            Nerdy Library
                        </span>
                    </a>
                    <h1 className="text-xl font-semibold">Sign In</h1>
                    <small className="text-gray-400">
                        Welcome back! Please enter your details
                    </small>
                    {/* Form */}
                    {isAlert ? (
                        <Alert key={alertMessage} message={alertMessage} />
                    ) : (
                        ''
                    )}
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-3">
                            <label className="mb-2 block text-xs font-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-xs font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="*****"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        {/* <div className="mb-3 flex flex-wrap content-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="mr-1 checked:bg-purple-700"
                                        />{' '}
                                        <label
                                            htmlFor="remember"
                                            className="mr-auto text-xs font-semibold"
                                        >
                                            Remember me
                                        </label>
                                    </div> */}
                        <div className="mb-3">
                            <button className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                                Sign in
                            </button>
                        </div>
                    </form>
                    {/* Footer */}
                    <div className="text-center">
                        <span className="text-xs text-gray-400 font-semibold">
                            Don't have account?{' '}
                        </span>
                        <Link
                            href="/signup"
                            className="text-xs font-semibold text-purple-700"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
