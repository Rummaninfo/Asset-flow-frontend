import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Footer/Footer';

const MainLayout = () => {
    return (
        <div className=' flex flex-col  min-h-screen mx-auto container'>
            <Navbar></Navbar>
            <main className='flex-1  flex mx-auto'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>

            
            
        </div>
    );
};

export default MainLayout;