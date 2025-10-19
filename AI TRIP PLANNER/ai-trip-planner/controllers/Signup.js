import React from 'react'
import bcrypt from 'bcryptjs'
import { app } from 'config/Firebase'
import { db } from 'config/db'
import {collection,setDoc,getDoc,doc,updateDoc,increment} from 'firebase/firestore'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
export const SignUp=async(req,res,next)=>{
    const { username, email, password, role } = req.body;
  
    try{
     const auth=getAuth(app)
     
 const userCredential= await createUserWithEmailAndPassword(auth,email,password)
 const user = userCredential.user;
   const collectionName = role === 'admin' ? 'admin' : 'user';
   console.log(collectionName)
        await setDoc(doc(collection(db, collectionName), user.uid), {
          //  uid: user.uid,
            username,
            email: user.email,
            role: role,
           
            createdAt: new Date()
        });

         if (role === 'user') {
            const metricsDocRef = doc(db, 'metrics', 'userCounts');
            const metricsDocSnap = await getDoc(metricsDocRef);

            const currentDate = new Date();
            const currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;

            if (!metricsDocSnap.exists()) {
                await setDoc(metricsDocRef, {
                    totalUsers: 1,
                    monthlyCounts: { [currentMonth]: 1 }
                });
            } else {
                const data = metricsDocSnap.data();
                const monthlyCounts = data.monthlyCounts || {};

                if (monthlyCounts[currentMonth]) {
                    monthlyCounts[currentMonth] += 1;
                } else {
                    monthlyCounts[currentMonth] = 1;
                }
                await updateDoc(metricsDocRef, {
                    totalUsers: increment(1),
                    monthlyCounts: monthlyCounts
                });
            }
        }

        res({ status: 200, message: 'Account Created Successfully ', user });
    }
    catch(err){
        if (err.code === 'auth/email-already-in-use') {
      return  next({ status: 400, message: 'This email is already registered!' });
        }
        else{
       return next({ status: 400, message: err.message });
        }
    }
}