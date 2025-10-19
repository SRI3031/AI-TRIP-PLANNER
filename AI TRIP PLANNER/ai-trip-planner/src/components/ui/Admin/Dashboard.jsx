import AdminPage from './AdminPage';

import TripDetails from './TripDetails';

import Header from './Header'

import Sidebar from './Sidebar'
import React, { useState,useEffect } from 'react'
import UserDetails from './UserDetails';
import AdminReview from './AdminReview';
import Profile from './Profile';

function Dashboard() {
  const [sideBar, setSideBar]=useState(false);
  const [currentPage, setCurrentPage]=useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className='min-h-sceen bg-gradient-to-br from-slate-50 via-blue-50
    to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
    transition-all duration-500 bg-cover bg-center'
    style={{backgroundImage: "url('https://img.freepik.com/premium-vector/blue-sky-abstract-background-vector-template_393879-4420.jpg')"}}>
        <div className='flex h-screen overflow-hidden'>
            <Sidebar collapsed={sideBar} onToggle={()=>{setSideBar(!sideBar)}}
              currentPage={currentPage}
              onPageChange={setCurrentPage}/>
            <div className='flex-1 flex flex-col overflow-hidden'>
              <Header onToggleTheme={toggleDarkMode} sideBar={sideBar} 
              onToggleSidebar={()=>setSideBar(!sideBar)} 
              onNavigate={setCurrentPage}/>
              <main className='flex-1 overflow-y-auto bg-transparent'>
                <div className='p-6 space-y-6'>
             {currentPage==='dashboard' && <AdminPage/>}
               {currentPage==='profile' && <Profile/>}
             {currentPage==='user' && <UserDetails/>}
              {currentPage==='trip' && <TripDetails/>}
               {currentPage==='review' && <AdminReview/>}
              
                </div>
              </main>
            </div>
        </div>
    </div>
  )
}

export default Dashboard