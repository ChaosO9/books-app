'use client';
import { useState, useEffect, Suspense } from 'react';
import MainLayout from './components/main/MainLayout';
import ItemTable from './components/main/ItemTable';
import withAuth from './lib/PageAuth';
import MainPage from './components/main/MainPage';
import { parseCookies } from 'nookies';
import Loading from './components/main/Loading';
import { fetchBaseURL } from './lib/fetchBaseURL';
// import { GetServerSideProps } from 'next';

function BookListPage() {
    const [books, setBooks] = useState([]);
    const [mainInfo, setMainInfo] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [selectedBookISBN, setSelectedBookISBN] = useState('1');
    const [page, setPage] = useState('');
    const { token } = parseCookies();

    useEffect(() => {
        fetch(fetchBaseURL + '/api/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBooks(data.data);
                setMainInfo(data);
            });
        fetch(fetchBaseURL + '/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserInfo(data.user);
            });
    }, []);

    return (
        <MainLayout userInfo={userInfo}>
            <MainPage
                books={books}
                setBooks={setBooks}
                selectedISBN={selectedBookISBN}
                mainInfo={mainInfo}
            >
                <ItemTable
                    selectedBookISBN={selectedBookISBN}
                    setSelectedBookISBN={setSelectedBookISBN}
                    books={books}
                />
            </MainPage>
        </MainLayout>
    );
}

export default withAuth(BookListPage);
