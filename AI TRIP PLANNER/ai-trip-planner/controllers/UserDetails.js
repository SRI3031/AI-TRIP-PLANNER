// controllers/UserDetails.js
import { db } from '../config/db';
import { collection, doc, getDocs, getDoc, deleteDoc } from 'firebase/firestore';

// Fetch all users, filling missing fields with "Not Provided"
export async function getUsers() {
  const usersCol = collection(db, 'user');
  const snapshot = await getDocs(usersCol);
  const users = [];

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    users.push({
      id: docSnap.id,
      username: data.username || 'Not Provided',
      email: data.email || 'Not Provided',
      country: data.country || 'Not Provided',
      city: data.city || 'Not Provided',
      createdAt: data.createdAt || null,
    });
  });

  return users;
}

// Delete user by id without updating metrics
export async function deleteUser(id) {
  const userDocRef = doc(db, 'user', id);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    throw new Error('User not found');
  }

  // Delete user
  await deleteDoc(userDocRef);

  return { message: 'User deleted successfully' };
}
