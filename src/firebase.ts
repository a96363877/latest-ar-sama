// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';

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

async function getOrCreateVisitorId(ip: string): Promise<string> {
  const visitorRef = doc(db, 'visitors', ip);
  const visitorDoc = await getDoc(visitorRef);

  if (!visitorDoc.exists()) {
    await setDoc(visitorRef, { createdAt: new Date() });
  }

  return ip;
}

async function addVisitorData(visitorId: string, dataType: string, data: any) {
  const docRef = doc(db, 'visitors', visitorId, dataType, 'data');
  await setDoc(docRef, data, { merge: true });
}

async function getAllVisitorData() {
  const visitorsRef = collection(db, 'visitors');
  const visitorsSnapshot = await getDocs(visitorsRef);
  const visitors: any[] = [];

  for (const visitorDoc of visitorsSnapshot.docs) {
    const visitorId = visitorDoc.id;
    const visitorInfo = visitorDoc.data();

    const infoTypes = ['visitorInfo', 'personalInfo', 'paymentInfo'];
    const visitorData: any = { id: visitorId, ...visitorInfo };

    for (const infoType of infoTypes) {
      const dataRef = doc(db, 'visitors', visitorId, infoType, 'data');
      const dataDoc = await getDoc(dataRef);
      if (dataDoc.exists()) {
        visitorData[infoType] = dataDoc.data();
      }
    }

    visitors.push(visitorData);
  }

  return visitors;
}

async function getVisitorStatistics() {
  const visitorsRef = collection(db, 'visitors');
  const visitorsSnapshot = await getDocs(visitorsRef);
  
  const totalVisitors = visitorsSnapshot.size;
  let countriesCount: { [key: string]: number } = {};
  let completedProfilesCount = 0;

  for (const visitorDoc of visitorsSnapshot.docs) {
    const visitorInfoRef = doc(db, 'visitors', visitorDoc.id, 'visitorInfo', 'data');
    const visitorInfoDoc = await getDoc(visitorInfoRef);
    if (visitorInfoDoc.exists()) {
      const country = visitorInfoDoc.data().country;
      if (country) {
        countriesCount[country] = (countriesCount[country] || 0) + 1;
      }
    }

    const personalInfoRef = doc(db, 'visitors', visitorDoc.id, 'personalInfo', 'data');
    const paymentInfoRef = doc(db, 'visitors', visitorDoc.id, 'paymentInfo', 'data');
    const personalInfoDoc = await getDoc(personalInfoRef);
    const paymentInfoDoc = await getDoc(paymentInfoRef);

    if (personalInfoDoc.exists() && paymentInfoDoc.exists()) {
      completedProfilesCount++;
    }
  }

  return {
    totalVisitors,
    topCountries: Object.entries(countriesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
    completedProfilesCount,
  };
}
export async function addData(data:any){
  try {
      const docRef = await doc(db, 'pays', data.id!);
      const ref = await setDoc(docRef, data)

      console.log("Document written with ID: ", docRef.id)
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e)
      // You might want to show an error message to the user here
    }
}

export { db, getOrCreateVisitorId, addVisitorData, getAllVisitorData, getVisitorStatistics };

