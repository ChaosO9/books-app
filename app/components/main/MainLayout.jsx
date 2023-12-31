import React from 'react';
import Navbar from './Navbar';
import SideBar from './SideBar';

export default function MainLayout({ children }) {
    return (
        <div>
            <Navbar />
            <SideBar>{children}</SideBar>
        </div>
    );
}
