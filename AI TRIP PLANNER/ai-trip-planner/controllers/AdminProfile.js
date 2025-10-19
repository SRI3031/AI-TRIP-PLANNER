// controllers/AdminProfile.js
import { getAuth,deleteUser } from 'firebase/auth';
import { doc, getDoc,deleteDoc } from 'firebase/firestore';
import { db } from 'config/db';

export const AdminProfile = async (setFormData) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    const adminRef = doc(db, 'admin', currentUser.uid); // UID must match document ID
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      const adminData = adminSnap.data();
      setFormData({
        username: adminData.username || '',
        email: adminData.email || '',
      });
    } else {
      console.error('Admin document not found.');
    }
  } else {
    console.error('No admin is logged in.');
  }
};

export const DeleteAdmin = async (uid) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user logged in.");
  }

  try {
    // 1. Delete from Firestore 'admin' collection
    const adminRef = doc(db, "admin", uid);
    await deleteDoc(adminRef);

    // 2. Delete from Firebase Auth
    await deleteUser(user);

    return { success: true, message: "Account Deleted Successfully." };
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw new Error(error.message || "Failed to delete account.");
  }
};


