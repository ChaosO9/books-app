'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Alert from '../components/login-signup/alert';
import { fetchBaseURL } from '../lib/fetchBaseURL';

export default function Form() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const registerPayload = {
        name,
        email,
        password,
        password_confirmation: confirm_password,
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch(fetchBaseURL + '/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerPayload),
        });

        if (res.status == 200) {
            router.push('/login');
        } else {
            const { message } = await res.json();
            console.log(message);
            setAlertMessage(message);
            setIsAlert(true);
        }
    }

    const isFormValid = name && email && password === confirm_password;

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
                        @
                    </a>
                    <h1 className="text-xl font-semibold">Sign Up</h1>
                    <small className="text-gray-400">
                        Please enter your details
                    </small>
                    {isAlert ? (
                        <Alert key={alertMessage} message={alertMessage} />
                    ) : (
                        ''
                    )}
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-3">
                            <label className="mb-2 block text-xs font-semibold">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-xs font-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="JohnDoe@gmail.com"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-xs font-semibold">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="*****"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500onChange={(e) => setName(e.target.value)}"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordTouched(true);
                                }}
                            />
                            {password !== confirm_password &&
                                confirmPasswordTouched && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            Oops!
                                        </span>{' '}
                                        Passwords do not match!
                                    </p>
                                )}
                        </div>
                        <div className="mb-3">
                            <button
                                className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md disabled:bg-slate-500"
                                disabled={!isFormValid}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {/* Footer */}
                    <div className="text-center">
                        <span className="text-xs text-gray-400 font-semibold">
                            Already have an account?{' '}
                        </span>
                        <Link
                            href="/login"
                            className="text-xs font-semibold text-purple-700"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
