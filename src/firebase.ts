// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc,  getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAPk6FOIwxX0YgHtpRsknnrU5AuNaQaLV0',
  authDomain: 'newprojectsamak.firebaseapp.com',
  projectId: 'newprojectsamak',
  storageBucket: 'newprojectsamak.firebasestorage.app',
  messagingSenderId: '714671646510',
  appId: '1:714671646510:web:4967e1466fd561edb7bcbf',
  measurementId: 'G-Q05X22RT8R',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);



export async function addData(data:any){
  try {
      const docRef = await doc(db, 'pays', data.id!);
      await setDoc(docRef, data)

      console.log("Document written with ID: ", docRef.id)
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e)
      // You might want to show an error message to the user here
    }
}

export { db};

