import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'config/Firebase'; 

export const handleVerify = async (req, res, next) => {
  const { email } = req.body;

  try {
    await sendPasswordResetEmail(auth, email);
    res({
      status: 200,
      message: `Verification link sent to ${email}`
    });
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};
