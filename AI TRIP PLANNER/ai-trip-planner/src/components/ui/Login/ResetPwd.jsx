import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "config/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPwd() {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setEmail(email);
          setIsValidCode(true);
        })
        .catch((error) => {
          toast.error("Invalid or expired reset link.");
          console.error(error);
        });
    }
  }, [oobCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Password has been reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-[url('/sea.jpg')] bg-cover bg-center h-screen w-screen p-8 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-8 text-black">
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">Reset Password</h1>

        {isValidCode ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-black/80 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-4 py-2 bg-black/20 border border-black/30 rounded-md outline-none text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/80 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 bg-black/20 border border-black/30 rounded-md outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-white hover:bg-gray-400 rounded-md font-semibold text-black transition-all"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500 font-semibold">Invalid or Expired Link</p>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
}
