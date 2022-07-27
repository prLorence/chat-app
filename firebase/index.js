import { getApps, initializeApp } from 'firebase/app';
import { getAuth, EmailAuthProvider } from 'firebase/auth';

import {
  getDatabase,
  ref,
  get,
  child,
  update,
  set,
  limitToFirst,
  limitToLast,
  query,
  orderByChild,
  equalTo,
  startAt,
  endAt,
} from 'firebase/database';

const firebase = () => { 
  const clientCredentials = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!getApps().length) {
    // return;
  }
  
  const app = initializeApp(clientCredentials);
  const db = getDatabase(app);
  const auth = getAuth(app);

  return { 
    db, 
    auth, 
    EmailAuthProvider, 
    ref, 
    get, 
    update, 
    set, 
    limitToFirst, 
    limitToLast, 
    query, 
    orderByChild,
    equalTo,
    startAt,
    endAt,
    child
  }
};

export default firebase;



