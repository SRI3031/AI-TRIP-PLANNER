import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { doc,getDoc } from "firebase/firestore";
import { db } from "config/db";
import {app} from 'config/Firebase'
export const isLogin = async (req) => {
  const { email, password } = req.body;
  
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    let userData;
    let role = '';

    const userDoc = await getDoc(doc(db, 'user', user.uid));
    if (userDoc.exists()) {
      userData = userDoc.data();
      role = 'user';
    } else {
      const adminDoc = await getDoc(doc(db, 'admin', user.uid));
      if (adminDoc.exists()) {
        userData = adminDoc.data();
        role = 'admin';
      }
    }

    if (!userData) {
      throw new Error('User not found in database');
    }

    return {
      status: 200,
      message: 'Login Successful',
      user: {
        uid: user.uid,
        email: user.email,
        role: role,
        username: userData.username
      }
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
