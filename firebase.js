import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDCyyZ-EYbVtmyr7eEH9uTEDthV_RetFIQ",
  authDomain: "ketan-project-f79a7.firebaseapp.com",
  projectId: "ketan-project-f79a7",
  storageBucket: "ketan-project-f79a7.firebasestorage.app",
  messagingSenderId: "391565266590",
  appId: "1:391565266590:web:dabf03b0df2b5ead23358f"
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