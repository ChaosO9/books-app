'use client';
import { useState, useEffect } from 'react';
import MainLayout from './components/main/MainLayout';
import ItemTable from './components/main/ItemTable';
import withAuth from './lib/PageAuth';
import MainPage from './components/main/MainPage';

function page() {
    const [books, setBooks] = useState([]);
    const [mainInfo, setMainInfo] = useState('');

    useEffect(() => {
        fetch('/api/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBooks(data.data);
                setMainInfo(data);
            });
    }, []);

    return (
        <MainLayout>
            <MainPage mainInfo={mainInfo}>
                <ItemTable books={books} />
            </MainPage>
        </MainLayout>
    );
}

export default withAuth(page);
