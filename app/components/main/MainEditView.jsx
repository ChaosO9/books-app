'use client';
import { useState, useEffect, Suspense } from 'react';
import { parseCookies } from 'nookies';
import MainLayout from './MainLayout';

export default function MainEditView({ children }) {
    const [userInfo, setUserInfo] = useState('');
    const { token } = parseCookies();

    useEffect(() => {
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

    return <MainLayout userInfo={userInfo}>{children}</MainLayout>;
}
