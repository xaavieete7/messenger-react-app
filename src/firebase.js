import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const auth = firebase.initializeApp({
	apiKey: "AIzaSyDHC2nRqKPqLnWwDHt7zkPuard6iZnKRhI",
	authDomain: "messenger-chat-91611.firebaseapp.com",
	projectId: "messenger-chat-91611",
	storageBucket: "messenger-chat-91611.appspot.com",
	messagingSenderId: "187382007941",
	appId: "1:187382007941:web:7228a616de451f2c9e81ec",
	measurementId: "G-9GX5VFN807"
}).auth();