import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { db, auth };

export const getCart = async (userId) => {
  try {
    const cartRef = doc(db, 'users', userId, 'cart', 'current');
    const docSnap = await getDoc(cartRef);
    return docSnap.exists() ? docSnap.data() : { items: [], total: 0 };
  } catch (error) {
    console.error("Error getting cart:", error);
    return { items: [], total: 0 };
  }
};

export const updateCart = async (userId, cartData) => {
  try {
    const cartRef = doc(db, 'users', userId, 'cart', 'current');
    await setDoc(cartRef, cartData);
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

export const addReceipt = async (userId, receiptData) => {
  try {
    const receiptsRef = collection(db, 'users', userId, 'receipts');
    const docRef = await addDoc(receiptsRef, {
      ...receiptData,
      createdAt: serverTimestamp(),
      status: 'completed'
    });
    return docRef.id; // Returns the auto-generated ID
  } catch (error) {
    console.error("Error adding receipt:", error);
    throw error;
  }
};
