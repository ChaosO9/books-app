'use client';
import { useState, useEffect, Suspense } from 'react';
import MainLayout from './components/main/MainLayout';
import ItemTable from './components/main/ItemTable';
import withAuth from './lib/PageAuth';
import MainPage from './components/main/MainPage';
import { parseCookies } from 'nookies';
import { parse } from 'dotenv';
import Loading from './components/main/Loading';

function page() {
    const [books, setBooks] = useState([]);
    const [mainInfo, setMainInfo] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [selectedBookISBN, setSelectedBookISBN] = useState('9781491904243');
    const [page, setPage] = useState('');
    const { token } = parseCookies();

    useEffect(() => {
        fetch('/api/books', {
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
        fetch('/api/user', {
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
            <MainPage selectedISBN={selectedBookISBN} mainInfo={mainInfo}>
                <Suspense fallback={<Loading />}>
                    <ItemTable
                        selectedBookISBN={selectedBookISBN}
                        setSelectedBookISBN={setSelectedBookISBN}
                        books={books}
                    />
                </Suspense>
            </MainPage>
        </MainLayout>
    );
}

export default withAuth(page);
