import React from 'react';
import Navbar from './Navbar';
import SideBar from './SideBar';

export default function MainLayout({ children, userInfo }) {
    return (
        <div>
            <Navbar userInfo={userInfo} />
            <SideBar>{children}</SideBar>
        </div>
    );
}
