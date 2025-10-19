import React from 'react';
import StatGrid from './StatGrid';
import Profile from './Profile';


function AdminPage() {
  return (
    <div className='space-y-6'>
    
      {/* Stats Grid */}
      <StatGrid />

      
      <Profile />

      
      
       
      </div>
   
  );
}

export default AdminPage;
