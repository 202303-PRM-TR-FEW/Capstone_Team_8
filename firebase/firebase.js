// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
	query,
	collection,
	onSnapshot,
	addDoc,
	doc,
	getDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';

import store from '../app/store';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB8UTCbWS3P2FHDpLXFG07yTQmalAa8EHw',
	authDomain: 'crowdfundingcapstone.firebaseapp.com',
	projectId: 'crowdfundingcapstone',
	storageBucket: 'crowdfundingcapstone.appspot.com',
	messagingSenderId: '312824414413',
	appId: '1:312824414413:web:ad1d445759277801dc6984',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth();

export const fetchAllData = () => {
	const q = query(collection(db, 'app'));
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		let dataArr = [];
		querySnapshot.forEach((doc) => {
			dataArr.push({ ...doc.data(), id: doc.id });
		});
		return dataArr;
	});
};

export const createProject = async (data) => {
	try {
		const result = await addDoc(collection(db, 'app'), data);
		return result;
	} catch (e) {
		console.log(e);
	}
};
export const login = async (email, password) => {
	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password);

		return user;
	} catch (e) {
		console.log(e);
	}
};

export const logOut = async () => {
	try {
		await signOut(auth);
	} catch (e) {
		console.log(e);
	}
};
export const register = async (email, password, userName) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password).then(
			async (res) => {
				await updateProfile(auth.currentUser, {
					displayName: userName,
				});
			}
		);
	} catch (e) {
		console.log(e);
	}
};

export const userLoginStatus = onAuthStateChanged(auth, (user) => {
	return user;
});

// console.log(userLoginStatus);
export const uploadImage = async (imageFile) => {
	const storageRef = ref(storage, 'bucket/' + imageFile.name);
	return uploadBytes(storageRef, imageFile).then((snapshot) => {
		return getDownloadURL(snapshot.ref);
	});
};
export const handleUpload = async (event, callback) => {
	event.preventDefault();
	const file = event.target.files[0];

	try {
		const downloadURL = await uploadImage(file);

		callback(downloadURL);
	} catch (error) {
		console.error('Error uploading file:', error);
	}
};
export const fetchDocById = async (id) => {
	const docRef = doc(db, 'app', id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log('Document data:', docSnap.data());
		return docSnap.data();
	} else {
		console.log('No such document!');
	}
};

export default app;
