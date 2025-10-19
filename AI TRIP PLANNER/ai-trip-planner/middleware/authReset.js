import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from 'config/db'; 
export const validResetForm = async (req, res, next) => {
  const { email } = req.body;

  try {
    let emailExists = false;

    const userQuery = query(collection(db, 'user'), where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      emailExists = true;
    }

    if (!emailExists) {
      const adminQuery = query(collection(db, 'admin'), where('email', '==', email));
      const adminSnapshot = await getDocs(adminQuery);
      if (!adminSnapshot.empty) {
        emailExists = true;
      }
    }

    if (!emailExists) {
      return next({ status: 404, message: 'No account found with this email' });
    }

    next();

  } catch (err) {
    next({ status: 500, message: err.message });
  }
};
