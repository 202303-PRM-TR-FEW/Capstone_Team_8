// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { createTranslator } from 'next-intl';
import messagesEN from '../messages/en.json';
import messagesTR from '../messages/tr.json';
import {
	query,
	collection,
	onSnapshot,
	addDoc,
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	deleteDoc,
	where,
	getDocs,
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
import store from '../app/[locale]/store';
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
const messages = {
	en: messagesEN,
	tr: messagesTR,
};
let localeLang = localStorage.getItem('i18nextLng') || 'en';
// let translator = createTranslator({
// 	locale: localeLang,
// 	messages: messages[localeLang],
// });
export const translate = (key) => {
	let localeLang = localStorage.getItem('i18nextLng') || 'en';
	let translator = createTranslator({
		locale: localeLang,
		messages: messages[localeLang],
	});
	return translator(key);
};

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

		enqueueSnackbar(translate('create_project_success'), {
			variant: 'success',
		});

		return result;
	} catch (e) {
		enqueueSnackbar(translate('create_project_error'), { variant: 'error' });
		console.log(e);
	}
};
export const createComment = async (data) => {
	try {
		const result = await addDoc(collection(db, 'comments'), data);
		enqueueSnackbar(translate('create_comment_success'), {
			variant: 'success',
		});
		return result;
	} catch (e) {
		enqueueSnackbar(translate('create_comment_error'), {
			variant: 'error',
		});
		console.log(e);
	}
};

export const createSubs = async (data) => {
	try {
		const result = await addDoc(collection(db, 'newsletter'), data);
		enqueueSnackbar(translate('create_subs_success'), {
			variant: 'success',
		});

		return result;
	} catch (e) {
		enqueueSnackbar(translate('create_subs_error'), { variant: 'error' });
		console.log(e);
	}
};
export const login = async (email, password) => {
	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password);

		enqueueSnackbar(translate('login_success'), { variant: 'success' });

		return user;
	} catch (e) {
		enqueueSnackbar(translate('login_error'), { variant: 'error' });

		console.log(e);
	}
};

export const logOut = async () => {
	try {
		await signOut(auth);
		enqueueSnackbar(translate('logout_success'), { variant: 'success' });
	} catch (e) {
		enqueueSnackbar(translate('logout_error'), { variant: 'error' });
		console.log(e);
	}
};
export const register = async (email, password, userName, imageUrl) => {
	try {
		if (userName.length < 1) {
			enqueueSnackbar(translate('enter_username'), { variant: 'error' });
			return;
		}

		if (imageUrl.length < 1) {
			enqueueSnackbar(translate('upload_image_error'), { variant: 'error' });
			return;
		}
		await createUserWithEmailAndPassword(auth, email, password).then(
			async (res) => {
				try {
					await updateProfile(auth.currentUser, {
						displayName: userName,
						photoURL: imageUrl,
					});
				} catch (error) {
					console.log(error);
					enqueueSnackbar(translate('register_error'), { variant: 'error' });
				}
				await addDoc(collection(db, 'users'), {
					uid: auth.currentUser.uid,
					displayName: userName,
					photoURL: imageUrl,
				});

				enqueueSnackbar(translate('register_success'), {
					variant: 'success',
				});
			}
		);
	} catch (e) {
		enqueueSnackbar(translate('register_error'), { variant: 'error' });
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
		enqueueSnackbar(translate('upload_error'), { variant: 'error' });
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

export const fetchDocByUserId = async (userId) => {
	let dataArr = [];
	const usersCollection = collection(db, 'users');
	const q = query(usersCollection, where('uid', '==', userId));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		dataArr.push({ ...doc.data(), id: doc.id });
	});
	return dataArr;
};

export const handleEdit = async (project, data) => {
	try {
		const payload = {
			time: Date.now(),
			donation: data.donation,
			user: {
				uid: auth.currentUser.uid,
			},
		};
		await updateDoc(doc(db, 'app', project), {
			donations: arrayUnion(payload),
		});
		enqueueSnackbar(translate('donate_success'), { variant: 'success' });
	} catch (e) {
		enqueueSnackbar(translate('donate_error'), { variant: 'error' });
		console.log(e);
	}
};
export const handleDelete = async (id) => {
	try {
		await deleteDoc(doc(db, 'app', id));
		enqueueSnackbar(translate('delete_project_success'), {
			variant: 'success',
		});
	} catch (e) {
		enqueueSnackbar(translate('delete_project_error'), { variant: 'error' });
		console.log(e);
	}
};

export const handleCommentDelete = async (id) => {
	try {
		await deleteDoc(doc(db, 'comments', id));
		enqueueSnackbar(translate('delete_comment_success'), {
			variant: 'success',
		});
	} catch (e) {
		enqueueSnackbar(translate('delete_comment_error'), { variant: 'error' });
		console.log(e);
	}
};

export const updateUserPassword = async (currentPassword, newPassword) => {
	const userEmail = auth.currentUser.email;
	try {
		const { user } = await signInWithEmailAndPassword(
			auth,
			userEmail,
			currentPassword
		);

		if (user) {
			updatePassword(user, newPassword)
				.then(() => {
					// Update successful.
					enqueueSnackbar(translate('password_change_success'), {
						variant: 'success',
					});
				})
				.catch((error) => {
					enqueueSnackbar(translate('password_change_error'), {
						variant: 'error',
					});
				});
		}
	} catch (error) {
		enqueueSnackbar(translate('password_change_error'), {
			variant: 'error',
		});
		console.log(error);
	}
};

export const updateUserProfilePicture = (newImage) => {
	const user = auth.currentUser;
	if (newImage.length < 1) {
		enqueueSnackbar(translate('upload_image'), { variant: 'error' });
		return;
	}
	updateProfile(user, {
		photoURL: newImage,
	}).then(async () => {
		// Update successful.

		const usersCollection = collection(db, 'users');
		const q = query(usersCollection, where('uid', '==', user.uid));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			updateDoc(doc.ref, { photoURL: newImage });
		});
		enqueueSnackbar(translate('image_change_success'), { variant: 'success' });
	});
};

export const updateFollow = async (data, follow) => {
	try {
		const user = auth.currentUser;
		const payload = {
			followedUser: data,
			follow: follow,
		};
		const usersCollection = collection(db, 'users');
		const q = query(usersCollection, where('uid', '==', user.uid));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			updateDoc(doc.ref, { followers: arrayUnion(payload) });
		});
		enqueueSnackbar(translate('follow_success'), { variant: 'success' });
	} catch (e) {
		enqueueSnackbar(translate('follow_error'), { variant: 'error' });
		console.log(e);
	}
};

export const updateUserDisplayName = (displayName) => {
	const user = auth.currentUser;
	if (displayName.length < 1) {
		alert('Please upload an image!');
		return;
	}

	updateProfile(user, {
		displayName: displayName,
	})
		.then(async () => {
			// Update successful.
			alert('Successfully changed!');
			const usersCollection = collection(db, 'users');
			const q = query(usersCollection, where('uid', '==', user.uid));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				updateDoc(doc.ref, { displayName: displayName });
			});
		})
		.catch((error) => {
			alert(error.message);
		});
};

export const updateProject = async (id, data) => {
	try {
		await updateDoc(doc(db, 'app', id), data);
		enqueueSnackbar(translate('update_project_success'), {
			variant: 'success',
		});
	} catch (e) {
		enqueueSnackbar(translate('update_project_error'), { variant: 'error' });
		console.log(e);
	}
};

export default app;
