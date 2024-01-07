'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainEditView from '@/app/components/category/MainEditView';
import Alert from '@/app/components/login-signup/Alert';
import { fetchBaseURL } from '@/app/lib/fetchBaseURL';
import { parseCookies } from 'nookies';

export default function page({ params }) {
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [category_name, setCategoryName] = useState('');
    const { token } = parseCookies();
    const router = useRouter();
    let statusCode = '';

    useEffect(() => {
        const res = fetch(
            fetchBaseURL + '/api/categories/' + params.category_id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            },
        )
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
                    setCategoryName(data.category.category);
                }
            });
    }, []);

    async function editCategory(e) {
        e.preventDefault();

        const categoryDetail = {
            category_name,
        };

        const res = await fetch(
            fetchBaseURL + '/api/categories/' + params.category_id + '/edit',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(categoryDetail),
            },
        );

        const statusCode = res.status; // Here's where you get the status code
        const data = await res.json();

        if (statusCode !== 200) {
            console.log(statusCode);
            setAlertMessage(data.message);
            setIsAlert(true);
        } else {
            router.replace('/categories');
        }
    }

    return (
        <MainEditView>
            {/* drawer component */}
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                    <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* Modal header */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Category
                            </h3>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={editCategory}>
                            {isAlert ? (
                                <Alert
                                    key={alertMessage}
                                    message={alertMessage}
                                />
                            ) : (
                                ''
                            )}
                            <div className="sm:col-span-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-5"
                                        placeholder="Type category name"
                                        required=""
                                        defaultValue={category_name}
                                        onChange={(e) =>
                                            setCategoryName(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Edit category
                                </button>
                                <button
                                    onClick={() =>
                                        router.replace('/categories')
                                    }
                                    type="button"
                                    className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    <svg
                                        className="mr-1 -ml-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Discard
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </MainEditView>
    );
}
