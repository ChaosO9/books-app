'use client';
import React, { useState, useEffect } from 'react';
import { Datepicker } from 'flowbite-react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import Alert from '@/app/components/login-signup/Alert';
import MainEditView from '../components/main/MainEditView';

export default function page({ params }) {
    const router = useRouter();

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [updatedAt, setUpdatedAt] = useState(null);
    const [emailVerifiedAt, setEmailVerifiedAt] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const book_id = params.book_id;
    const { token } = parseCookies();
    let statusCode = '';

    useEffect(() => {
        const res = fetch('/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => {
                statusCode = response.status;
                return response.json();
            })
            .then((data) => {
                if (statusCode !== 200) {
                    console.log(statusCode);
                    setAlertMessage(data.message);
                    setIsAlert(true);
                } else {
                    const user = data.user;
                    setId(user.id);
                    setName(user.name);
                    setEmail(user.email);
                    setUpdatedAt(user.updated_at);
                    setEmailVerifiedAt(user.email_verified_at);
                    setCreatedAt(user.created_at);
                }
            });
    }, []);

    function handleDatePickerEditBook(date) {
        setPublished(date);
    }

    return (
        <>
            <MainEditView>
                {/* drawer component */}
                <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                    <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                        <form
                            action="#"
                            id="drawer-update-product"
                            className="p-7 rounded-md bg-white dark:bg-gray-800"
                            tabIndex={-1}
                            aria-labelledby="drawer-update-product-label"
                            aria-hidden="true"
                        >
                            <h5
                                id="drawer-label"
                                className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
                            >
                                View Detail User
                            </h5>
                            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 ">
                                <div className="space-y-4 sm:col-span-2 sm:space-y-6">
                                    {isAlert ? (
                                        <Alert
                                            key={alertMessage}
                                            message={alertMessage}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    <div>
                                        <label
                                            htmlFor="edit-book-title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            User ID
                                        </label>
                                        <input
                                            type="text"
                                            name="edit-book-title"
                                            id="edit-book-title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={id}
                                            placeholder="Type book title"
                                            required=""
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="edit-book-title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="edit-book-title"
                                            id="edit-book-title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={name}
                                            placeholder="Type book title"
                                            required=""
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="edit-book-website"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            name="edit-book-website"
                                            id="edit-book-website"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={email}
                                            placeholder="Type book source"
                                            required=""
                                            onChange={(e) =>
                                                setWebsite(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="edit-book-title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Email Verified At
                                        </label>
                                        <input
                                            type="text"
                                            name="edit-book-title"
                                            id="edit-book-title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={emailVerifiedAt}
                                            placeholder="Type book title"
                                            required=""
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="edit-book-title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Created At
                                        </label>
                                        <input
                                            type="text"
                                            name="edit-book-title"
                                            id="edit-book-title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={createdAt}
                                            placeholder="Type book title"
                                            required=""
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6 sm:w-1/2">
                                <button
                                    type="button"
                                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={() => router.replace('/')}
                                >
                                    OK
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </MainEditView>
        </>
    );
}
