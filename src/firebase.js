import {initializeApp} from "firebase/app";
import {
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    addDoc,
    collection,
    serverTimestamp,
    setDoc,
    doc,
    getDocs,
    updateDoc,
    getDoc,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {COLLECTIONS_NAMES, EMOTIONS} from "./consts";

const firebaseConfig = {
    apiKey: "AIzaSyCayePJYTxkL3Eqp2qCVb1aSTu1YctH8IY",
    authDomain: "expression-detection-chat.firebaseapp.com",
    projectId: "expression-detection-chat",
    storageBucket: "expression-detection-chat.appspot.com",
    messagingSenderId: "1093272618395",
    appId: "1:1093272618395:web:b016b46fbb56c69c26cd3e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const authUser = async () => {
    const res = await signInWithPopup(auth, provider);
    // should not await; reset the state of the user
    addUser(res.user.uid);
    return res.user;
}
const addUser = async (uid) => {
    return setDoc(doc(db, COLLECTIONS_NAMES.USERS, uid), {
        emotion: EMOTIONS.HAPPY,
    });
};

export const signOut = async () => {
    await auth.signOut();
}

export const addMessage = async (uid, text) => {
    const emotion = await getUserEmotion(uid);
    return addDoc(collection(db, COLLECTIONS_NAMES.MESSAGES), {
        uid,
        text,
        emotion,
        timestamp: serverTimestamp(),
    });
};

export const subscribeMessages = async (callback) => {
    return onSnapshot(
        query(
            collection(db, COLLECTIONS_NAMES.MESSAGES),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            console.log("123");
            const messages = querySnapshot.docs.map((doc) => doc.data());
            callback(messages);
        }
    );
};

export const subscribeInterlocutorEmotion = async (interlocutorUid, callback) => {
    return onSnapshot(doc(db, COLLECTIONS_NAMES.USERS, interlocutorUid), (doc) => {
        console.log("InterlocutorEmotion", doc.data().emotion);
        callback(doc.data());
    });
}

export const updateCurrentUserEmotion = async (currentUser, emotion) => {
    console.log("updateCurrentUserEmotion");
    updateDoc(doc(db, COLLECTIONS_NAMES.USERS, currentUser), {emotion});
}

export const getInterlocutorId = async (currentUid) => {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS_NAMES.USERS));
    return querySnapshot.docs.find((doc) => doc.id !== currentUid).id;
}

export const getUserEmotion = async (uid) => {
    const docRef = await getDoc(doc(db, COLLECTIONS_NAMES.USERS, uid));

    if (docRef.exists()) {
        return docRef.data().emotion;
    }

    return "";
}


