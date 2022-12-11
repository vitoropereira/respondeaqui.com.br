const firebaseConfig = {
  apiKey:
    process.env.FIREBASE_API_KEY || "AIzaSyBMYZaKWXjMidjttvjjH3j_NCiXdB7IwHY",
  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN || "respondeaqui-53e3c.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "respondeaqui-53e3c",
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || "respondeaqui-53e3c.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "119342197786",
  appId:
    process.env.FIREBASE_APP_ID || "1:119342197786:web:7c4f3c9c7b9b5568eeb5a3",
};

export default firebaseConfig;
