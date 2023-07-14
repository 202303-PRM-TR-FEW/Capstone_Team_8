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
	updateDoc,
	arrayUnion,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updateProfile,
	updatePassword,
} from 'firebase/auth';

import store from '../app/store';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

export const fetchAllData = () => {
	const q = query(collection(db, 'app'));
	onSnapshot(q, (querySnapshot) => {
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
		alert(e.message);
		console.log(e);
	}
};

export const logOut = async () => {
	try {
		await signOut(auth);
	} catch (e) {
		alert(e.message);
		console.log(e);
	}
};
export const register = async (email, password, userName, imageUrl) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password).then(
			async (res) => {
				await updateProfile(auth.currentUser, {
					displayName: userName,
					photoURL: imageUrl,
				});
			}
		);
	} catch (e) {
		alert(e.message);
		console.log(e);
	}
};

export const userLoginStatus = onAuthStateChanged(auth, (user) => {
	return user;
});

export const uploadImage = async (imageFile) => {
	const storageRef = ref(storage, 'bucket/' + imageFile.name);
	return uploadBytes(storageRef, imageFile).then((snapshot) => {
		return getDownloadURL(snapshot.ref);
	});
};
export const handleUpload = async (e, callback) => {
	e.preventDefault();
	const file = e.target.files[0];

	try {
		const downloadURL = await uploadImage(file);
		callback(downloadURL);
	} catch (error) {
		alert(error.message);
		console.error('Error uploading file:', error);
	}
};

export const fetchDocById = async (id) => {
	const docRef = doc(db, 'app', id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log('No such document!');
	}
};

// console.log(userLoginStatus);
export const handleEdit = async (project, data) => {
	try {
		const payload = {
			time: Date.now(),
			donation: data.donation,
			user: {
				uid: auth.currentUser.uid,
				displayName: auth.currentUser.displayName,
				imageUrl: auth.currentUser.photoURL,
			},
		};
		await updateDoc(doc(db, 'app', project), {
			donations: arrayUnion(payload),
		});
	} catch (e) {
		console.log(e);
	}
};
export const handleDelete = async (id) => {
	try {
		await deleteDoc(doc(db, 'app', id));
	} catch (e) {
		alert(e.message);
		console.log(e);
	}
};

export const updateUserPassword = (newPassword) => {
	const user = auth.currentUser;

	updatePassword(user, newPassword)
		.then(() => {
			// Update successful.
			alert('Successfully changed!');
		})
		.catch((error) => {
			alert(error.message);
		});
};

export const updateUserProfilePicture = (newImage) => {
	const user = auth.currentUser;
	if (newImage.length < 1) {
		alert('Please upload an image!');
		return;
	}
	updateProfile(user, {
		photoURL: newImage,
	})
		.then(() => {
			// Update successful.
			alert('Successfully changed!');
		})
		.catch((error) => {
			alert(error.message);
		});
};

export default app;
