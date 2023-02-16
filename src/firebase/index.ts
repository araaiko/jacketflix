/** 外部import */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, Timestamp } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { firebaseConfig } from './config';

initializeApp(firebaseConfig); // firebaseConfigを使って、firebaseを初期化する
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const functions = getFunctions();
export const FirebaseTimestamp = Timestamp;
