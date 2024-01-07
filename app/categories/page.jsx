'use client';
import { useState, useEffect, Suspense } from 'react';
import withAuth from '../lib/PageAuth';
import { fetchBaseURL } from '../lib/fetchBaseURL';
import { parseCookies } from 'nookies';
import MainLayout from '../components/main/MainLayout';
import ItemTable from '../components/category/ItemTable';
import MainPage from '../components/category/MainPage';
// import { GetServerSideProps } from 'next';

function BookListPage() {
    const [categories, setCategories] = useState([]);
    const [mainInfo, setMainInfo] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [selectedBookISBN, setSelectedBookISBN] = useState('1');
    const [page, setPage] = useState('');
    const { token } = parseCookies();

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
            <MainPage selectedISBN={selectedBookISBN} mainInfo={mainInfo}>
                <ItemTable
                    selectedBookISBN={selectedBookISBN}
                    setSelectedBookISBN={setSelectedBookISBN}
                    categories={categories}
                />
            </MainPage>
        </MainLayout>
    );
}

export default withAuth(BookListPage);
