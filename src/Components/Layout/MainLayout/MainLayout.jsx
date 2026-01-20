import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Footer/Footer';

const MainLayout = () => {
    return (
        <>
        <Navbar></Navbar>
        <div className=' flex flex-col  min-h-screen mx-auto container'>
            
            <main className='flex-1  flex mx-auto'>
                <Outlet></Outlet>
            </main>
            

            
            
        </div>
        <Footer></Footer>
        </>
    );
};

export default MainLayout;