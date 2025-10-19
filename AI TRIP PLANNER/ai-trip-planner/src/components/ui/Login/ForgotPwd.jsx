//Forgotpassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MailCheck, ArrowLeft } from 'lucide-react';
import { handleVerify } from 'controllers/ForgotPwd'; // adjust path if needed
import { validResetForm } from 'middleware/authReset';
const ForgotPwd = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async(e) => {
    e.preventDefault();
  //  handleVerify(email, setMessage, setError);
  const req = { body: { email } };

  const res = (response) => {
   // setMessage(response.message);
   toast.success(response.message)
    setError('');
  };

  const next = (err) => {
   // setError(err.message);
   toast.error(err.message)
    setSuccess('');
  };

  await validResetForm(req, res, (middlewareErr) => {
    if (middlewareErr) {
      next(middlewareErr);
    } else {
      handleVerify(req, res, next);
    }
  });
  };

  return (
    <div className="bg-[url('/sea.jpg')] min-h-screen flex items-center justify-center bg-cover bg-center px-4">
      <div className="bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/40">
        <div className="flex flex-col items-center">
          <MailCheck className="h-16 w-16 text-black mb-4" />
          <h2 className="text-3xl font-bold text-black drop-shadow mb-2">Forgot Password?</h2>
          <p className="text-black/90 text-center mb-6">
            Enter your registered email ID and we'll send you a verification link.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-black font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300 text-slate-700 placeholder-slate-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-cyan-600 hover:text-white transition duration-300"
          >
            Verify
          </button>
        </form>

        {/* Feedback Messages */}
       <div>
          
           <ToastContainer position="top-center" autoClose={3000} />
         </div>

        {/* Back to Login Link with Icon */}
        <div className="mt-6 text-center flex items-center justify-center gap-2">
          <ArrowLeft className="h-5 w-5 text-black" />
          <Link
            to="/login"
            className="text-black/90 font-medium underline hover:text-white transition duration-300"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;