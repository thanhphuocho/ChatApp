import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {apiKey: "AIzaSyC0fWGpin0JGkU2GpjmiibYj4vLe0PdI_4",
authDomain: "testapp-a4175.firebaseapp.com",
projectId: "testapp-a4175",
storageBucket: "testapp-a4175.appspot.com",
messagingSenderId: "279333841963",
appId: "1:279333841963:web:2b5a8fa34d719a92740e6e"
/* firebaseのサイトからコピペしてくる */
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const getMessageDocRef = async () => {
    return await firebase.firestore().collection('messages').doc();
};
/* 匿名認証の処理 */
export const getUserId = async () => {
    const userCredential = await firebase.auth().signInAnonymously();
    return userCredential.user?.uid;
};