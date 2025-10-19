import React, { useEffect, useState } from 'react';
import { Bell, ChevronDown, Filter, Menu, Plus, Search, Settings, Sun, LogOut } from 'lucide-react';
import { FiUser } from 'react-icons/fi';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'config/db';
import { useNavigate } from 'react-router-dom';

function Header({ sideBar, onToggleSidebar, onToggleTheme, onNavigate }) {
  const [username, setUsername] = useState('Admin');  
  const navigate=useNavigate()
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'user', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUsername(userData.username || user.email);
          } else {
            const adminDocRef = doc(db, 'admin', user.uid);
            const adminDocSnap = await getDoc(adminDocRef);
            if (adminDocSnap.exists()) {
              const adminData = adminDocSnap.data();
              setUsername(adminData.username || adminData.email);
            } else {
              setUsername(user.email);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUsername(user.email);
        }
      } else {
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    navigate('/home');
  };

  return (
    <div
      className='bg-white/-80 dark:bg-slate-900/80 backdrop-blur-xl border-b
    border-slate-200/50 dark:border-slate-700/50 px-6 py-4'
    >
      <div className='flex items-center justify-between'>
        {/* Left */}
        <div className='flex items-center space-x-4'>
          <button
            className='p-2 rounded-b-lg text-slate-600 dark:text-slate-300
                hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
            onClick={onToggleSidebar}
          >
            <Menu className='w-5 h-5' />
          </button>
          <div className='hidden md:block'>
            <h1
              className='text-2xl font-black text-purple-950 dark:text-white'
            >
              Dashboard
            </h1>
            <p>Hey, {username}! Here's what's happening today...</p>
          </div>
        </div>

        {/* Right */}
        <div className='flex items-center space-x-3'>
          {/* toggle */}
          <button
            className='p-2.5 rounded-xl text-slate-600 dark:text-slate-300
                hover:bg-slate-100 dark:hover:bg-slate-800 
                transition-colors'
            onClick={onToggleTheme}
          >
            <Sun className='w-5 h-5' />
          </button>

          <div
            className='flex items-center space-x-3 pl-3 border-l border-slate-200
                dark:border-slate-700'
          >
            <FiUser />
            <div className='hidden md:block'>
              <p className='text-sm text-slate-500 font-medium dark:text-slate-400'>{username}</p>
              <p className='text-xs text-slate-500  dark:text-slate-400'>Administrator</p>
            </div>
            <ChevronDown className='w-4 h-4 text-slate-400' />

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className='ml-2 flex items-center space-x-1 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors'
            >
              <LogOut className='w-4 h-4' />
              <span className='hidden md:inline'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
