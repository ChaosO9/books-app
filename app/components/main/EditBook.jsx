import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { Datepicker } from 'flowbite-react';
import Alert from '../login-signup/Alert';
import { fetchBaseURL } from '@/app/lib/fetchBaseURL';
import jwt from 'jsonwebtoken';

export default function EditBook({}) {
    const router = useRouter();

    const [book_id, setBookID] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pages, setPages] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [category_id, setCategoryID] = useState('');
    const [userId, setUserID] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [categories, setCategories] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [bookFile, setBookFile] = useState('');
    const [date, setDate] = useState('');
    const { token } = parseCookies();

    const formData = new FormData();
    formData.append('id', book_id);
    formData.append('cover_image', coverImage);
    formData.append('book_file', bookFile);
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('author', author);
    formData.append('published', published);
    formData.append('publisher', publisher);
    formData.append('pages', pages);
    formData.append('description', description);
    formData.append('website', website);
    formData.append('category', category_id);
    formData.append('created_by', userId);

    useEffect(() => {
        fetch(fetchBaseURL + '/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.data);
            });
    }, []);

    function handleDatePickerChange(date) {
        setPublished(date);
        console.log(date);
    }

    async function addBook(e) {
        e.preventDefault();

        const { token } = parseCookies();
        setUserID(jwt.decode(token).id);

        const res = await fetch(fetchBaseURL + '/api/books/add', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: formData,
        }).catch((error) => {
            setAlertMessage(error.message);
            setIsAlert(true);
        });

        const statusCode = res.status; // Here's where you get the status code
        const data = await res.json();

        if (statusCode !== 200) {
            console.log(statusCode);
            // setAlertMessage(data.message);
            // setIsAlert(true);
        } else {
            router.replace('/');
        }
    }
    return (
        <>
            {/* End block */}
            <div
                id="editBookModal"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full"
            >
                <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                    {/* Modal content */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* Modal header */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add Book
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="editBookModal"
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
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={addBook}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Book Title
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type book title"
                                        required=""
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Subtitle
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type book subtitle"
                                        required=""
                                        onChange={(e) =>
                                            setSubtitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="brand"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type book author"
                                        required=""
                                        onChange={(e) =>
                                            setAuthor(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        ISBN
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type ISBN number"
                                        required=""
                                        onChange={(e) =>
                                            setBookID(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="brand"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Published
                                    </label>
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
                                        <Datepicker
                                            name="selectedDate"
                                            onSelectedDateChanged={
                                                handleDatePickerChange
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Publisher
                                    </label>
                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type who publish the book"
                                        required=""
                                        onChange={(e) =>
                                            setPublisher(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="brand"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Pages
                                    </label>
                                    <input
                                        type="number"
                                        name="brand"
                                        id="brand"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type total pages of book"
                                        required=""
                                        onChange={(e) =>
                                            setPages(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Website
                                    </label>
                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type source of the book"
                                        required=""
                                        onChange={(e) =>
                                            setWebsite(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        defaultValue={'SL'}
                                        onChange={(e) =>
                                            setCategoryID(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        {categories && categories.length > 0 ? (
                                            <>
                                                <option value="SL">
                                                    Select category
                                                </option>
                                                {categories.map((category) => (
                                                    <option value={category.id}>
                                                        {category.category}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value="SL">
                                                Select category
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Write book description here"
                                        defaultValue={''}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="default_size"
                                        >
                                            Upload Cover Image
                                        </label>
                                        <input
                                            className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="default_size"
                                            type="file"
                                            onChange={(e) =>
                                                setCoverImage(e.target.files[0])
                                            }
                                        />
                                        <div
                                            class="pt-1 text-sm text-gray-500 dark:text-gray-300"
                                            id="user_avatar_help"
                                        >
                                            File Type: JPEG/JPG/PNG
                                        </div>
                                    </>
                                </div>
                                <div className="sm:col-span-2">
                                    <>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="default_size"
                                        >
                                            Upload Book
                                        </label>
                                        <input
                                            className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="default_size"
                                            type="file"
                                            onChange={(e) =>
                                                setBookFile(e.target.files[0])
                                            }
                                        />
                                        <div
                                            class="pt-1 mb-2 text-sm text-gray-500 dark:text-gray-300"
                                            id="user_avatar_help"
                                        >
                                            File Type: PDF
                                        </div>
                                    </>
                                </div>
                            </div>

                            {isAlert ? (
                                <Alert
                                    key={alertMessage}
                                    message={alertMessage}
                                />
                            ) : (
                                ''
                            )}

                            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Add book
                                </button>
                                <button
                                    data-modal-toggle="editBookModal"
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
            </div>
        </>
    );
}
