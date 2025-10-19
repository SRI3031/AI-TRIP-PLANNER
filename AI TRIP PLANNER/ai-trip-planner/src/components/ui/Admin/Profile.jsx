import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { AdminProfile } from "controllers/AdminProfile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DeleteAdmin } from "controllers/AdminProfile";

const Profile = () => {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        AdminProfile(setFormData);
      } else {
        setFormData({ username: "", email: "" });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const result = await DeleteAdmin(uid);
      toast.success(result.message);

      // Redirect to login after delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-blue-900 to-blue-300 dark:bg-gray-400 rounded-xl shadow-md">
        <div className="flex items-center gap-5 mb-6">
          <FaUserCircle className="text-4xl text-white dark:text-white" />
          <h1 className="text-3xl font-semibold text-white select-none">
            My Profile
          </h1>
        </div>
        <p className="mb-8 text-white dark:text-white font-medium">
          Your Account Information
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Admin Name */}
          <div className="flex items-center w-[400px] gap-5 p-4 border rounded-lg bg-indigo-50">
            <FaUser className="text-indigo-800 text-2xl" />
            <div>
              <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-1">
                Admin Name
              </p>
              <p className="text-lg font-medium text-gray-900">
                {formData.username || "Not set"}
              </p>
            </div>
          </div>

          {/* Email Address */}
          <div className="flex ml-10 w-[400px] items-center gap-5 p-4 border rounded-lg bg-indigo-50">
            <FaEnvelope className="text-indigo-600 text-2xl" />
            <div>
              <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-1">
                Email Address
              </p>
              <p className="text-lg font-medium text-gray-900">
                {formData.email || "Not set"}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <div className="flex justify-center ml-20">
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="flex items-center gap-2 bg-red-700 hover:bg-orange-600 active:bg-red-800 text-white font-semibold px-6 py-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minWidth: "160px" }}
            >
              <FaTrashAlt />
              {loading ? "Deleting..." : "Delete My Account"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
