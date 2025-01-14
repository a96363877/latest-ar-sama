// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAPk6FOIwxX0YgHtpRsknnrU5AuNaQaLV0',
  authDomain: 'newprojectsamak.firebaseapp.com',
  projectId: 'newprojectsamak',
  storageBucket: 'newprojectsamak.firebasestorage.app',
  messagingSenderId: '714671646510',
  appId: '1:714671646510:web:4967e1466fd561edb7bcbf',
  measurementId: 'G-Q05X22RT8R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Realtime Database instance
const database = getFirestore(app);

export default database;
