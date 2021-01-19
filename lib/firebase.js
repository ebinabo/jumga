import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	});
}

let firestore = firebase.firestore(),
	analytics;

if (typeof window !== "undefined") {
	if (process.env.NODE_ENV === "production") {
		analytics = firebase.analytics();
	}
}

export default firebase;

export { firestore };
