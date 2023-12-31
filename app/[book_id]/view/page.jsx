'use client';
import React, { useState, useEffect } from 'react';
import { Datepicker } from 'flowbite-react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import Alert from '@/app/components/login-signup/Alert';
import MainEditView from '@/app/components/main/MainEditView';
import { fetchBaseURL } from '@/app/lib/fetchBaseURL';

export default function page({ params }) {
    const router = useRouter();

    const [isbn, setISBN] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pages, setPages] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [book, setBook] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const book_id = params.book_id;
    const { token } = parseCookies();
    let statusCode = '';

    useEffect(() => {
        const res = fetch(fetchBaseURL + '/api/books/' + book_id, {
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
                    //Convert data for datepicker
                    const dateString = data.book.published;
                    const dateParts = dateString.split(' ');
                    const dateOnly = dateParts[0].split('-');
                    const dateFormatted = `${dateOnly[1]}-${dateOnly[2]}-${dateOnly[0]}`;
                    data.datepickerValue = dateFormatted;

                    setISBN(data.book.id);
                    setTitle(data.book.title);
                    setSubtitle(data.book.subtitle);
                    setAuthor(data.book.author);
                    setPublished(data.book.published);
                    setPublisher(data.book.publisher);
                    setPages(data.book.pages);
                    setDescription(data.book.description);
                    setWebsite(data.book.website);
                    setBook(data.book);
                }
            });
    }, []);

    function handleDatePickerEditBook(date) {
        setPublished(date);
    }

    async function getBookFile() {
        window.open(fetchBaseURL + '/api/books/' + book_id + '/pdf', '_blank');
    }

    async function getCoverImage() {
        window.open(
            fetchBaseURL + '/api/books/' + book_id + '/cover_image',
            '_blank',
        );
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
                                View Detail Book
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
                                            Book Title
                                        </label>
                                        <input
                                            type="text"
                                            name="edit-book-title"
                                            id="edit-book-title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={book.title}
                                            placeholder="Type book title"
                                            required=""
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="edit-book-description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Description
                                        </label>
                                        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                                                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                                                    <div className="flex items-center space-x-1 sm:pr-4">
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Attach file
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Embed map
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Upload image
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Format code
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Add emoji
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="flex-wrap items-center hidden space-x-1 sm:flex sm:pl-4">
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Add list
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Settings
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    data-tooltip-target="tooltip-fullscreen"
                                                    className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">
                                                        Full screen
                                                    </span>
                                                </button>
                                                <div
                                                    id="tooltip-fullscreen"
                                                    role="tooltip"
                                                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                                                    data-popper-reference-hidden=""
                                                    data-popper-escaped=""
                                                    data-popper-placement="bottom"
                                                    style={{
                                                        position: 'absolute',
                                                        inset: '0px auto auto 0px',
                                                        margin: 0,
                                                        transform:
                                                            'translate3d(0px, 335px, 0px)',
                                                    }}
                                                >
                                                    Show full screen
                                                    <div
                                                        className="tooltip-arrow"
                                                        data-popper-arrow=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                                                <textarea
                                                    id="edit-book-description"
                                                    rows={8}
                                                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                    placeholder="Write book description here"
                                                    required=""
                                                    defaultValue={
                                                        book.description
                                                    }
                                                    onChange={(e) =>
                                                        setDescription(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="edit-book-publisher"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Published
                                            </label>
                                            <Datepicker
                                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                name="selectedDate"
                                                onSelectedDateChanged={
                                                    handleDatePickerEditBook
                                                }
                                                defaultDate={
                                                    book.datepickerValue
                                                }
                                                autoHide={true}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="edit-book-website"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Website
                                        </label>
                                        <input
                                            type="text"
                                            name="edit-book-website"
                                            id="edit-book-website"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={book.website}
                                            placeholder="Type book source"
                                            required=""
                                            onChange={(e) =>
                                                setWebsite(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label
                                            htmlFor="edit-subtitle-book"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Subtitle
                                        </label>
                                        <input
                                            type="text"
                                            id="edit-subtitle-book"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={book.subtitle}
                                            placeholder="Type book subtitle"
                                            required=""
                                            onChange={(e) =>
                                                setSubtitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="item-weight"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            name="item-weight"
                                            id="item-weight"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={book.author}
                                            placeholder="Ex. John Doe"
                                            required=""
                                            onChange={(e) =>
                                                setAuthor(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="product-brand"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Book ID
                                        </label>
                                        <input
                                            type="number"
                                            id="product-brand"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={book.id}
                                            placeholder="Ex. 38723978"
                                            required=""
                                            onChange={(e) =>
                                                setISBN(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="length"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Publisher
                                        </label>
                                        <input
                                            type="text"
                                            name="length"
                                            id="lenght"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={book.publisher}
                                            placeholder="Ex. 105"
                                            required=""
                                            onChange={(e) =>
                                                setPublisher(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="breadth"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Pages
                                        </label>
                                        <input
                                            type="number"
                                            name="breadth"
                                            id="breadth"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            defaultValue={book.pages}
                                            placeholder="Ex. 266"
                                            required=""
                                            onChange={(e) =>
                                                setPages(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="breadth"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Book File
                                            {!book.book_file && (
                                                <span>(No Book File)</span>
                                            )}
                                        </label>
                                        <button
                                            type="button"
                                            className="text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-slate-500"
                                            onClick={getBookFile}
                                            disabled={
                                                book.book_file ? false : true
                                            }
                                        >
                                            <svg
                                                class="w-5 h-5 mr-1 -ml-1"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                            </svg>
                                            Download
                                        </button>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="breadth"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Cover Image File{' '}
                                            {!book.cover_image && (
                                                <span>(No Cover Image)</span>
                                            )}
                                        </label>
                                        <button
                                            type="button"
                                            className="text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-slate-500"
                                            onClick={getCoverImage}
                                            disabled={
                                                book.cover_image ? false : true
                                            }
                                        >
                                            <svg
                                                class="w-5 h-5 mr-1 -ml-1"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                            </svg>
                                            Download
                                        </button>
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
