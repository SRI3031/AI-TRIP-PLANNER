import React, { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUsers, deleteUser } from 'controllers/UserDetails'; // adjust path

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const badgeColors = [
    'bg-blue-500 text-white',
    'bg-purple-600 text-white',
    'bg-pink-500 text-white',
    'bg-indigo-500 text-white',
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  if (loading) return <div className="text-center p-10">Loading users...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 justify-center px-6 py-8 bg-cover"
     style={{backgroundImage: "url('https://marketplace.canva.com/EAFt0-MWpSU/2/0/900w/canva-soft-watercolour-no-copy-phone-wallpaper-in-purple-and-blue-gradient-style-O5sd-yFWWG4.jpg')"}}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-purple-900">
          User Details
        </h2>
        <p className="mt-1 text-lg text-black">
          Manage User Informations
        </p>
      </div>

      <div className="w-full overflow-x-auto backdrop-blur-2xl dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-xl">
        <table className="min-w-full text-left text-sm font-semibold">
          <thead className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-8 py-4">Username</th>
              <th className="px-8 py-4">Email Address</th>
              <th className="px-8 py-4">Country</th>
              <th className="px-8 py-4">City</th>
              <th className="px-8 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500 dark:text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800 dark:hover:to-indigo-900 ${
                    idx % 2 === 0 ? 'backdrop-blur-2xl dark:bg-gray-800' : 'backdrop-blur-2xl dark:bg-gray-900'
                  }`}
                >
                  <td className="px-8 py-4 flex items-center space-x-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        badgeColors[idx % badgeColors.length]
                      }`}
                    >
                      {getInitials(user.username)}
                    </span>
                    <span className="text-indigo-900 dark:text-indigo-300">{user.username}</span>
                  </td>
                  <td className="px-8 py-4 text-gray-700 dark:text-gray-400">{user.email}</td>
                  <td className="px-8 py-4 text-gray-700 dark:text-gray-400">{user.country}</td>
                  <td className="px-8 py-4 text-gray-700 dark:text-gray-400">{user.city}</td>
                  <td className="px-8 py-4 text-indigo-600 dark:text-indigo-400">
                    <button
                      aria-label="Delete user"
                      className="flex items-center space-x-1 hover:text-red-600 transition-colors font-medium"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FiTrash2 size={20} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDetails;
