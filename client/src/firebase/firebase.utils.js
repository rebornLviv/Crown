import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyBwK6qpkFhEWgqE-FmCnP2zUFA1PtVOiKs",
  authDomain: "crown-clothing-75ebb.firebaseapp.com",
  databaseURL: "https://crown-clothing-75ebb.firebaseio.com",
  projectId: "crown-clothing-75ebb",
  storageBucket: "crown-clothing-75ebb.appspot.com",
  messagingSenderId: "334134080617",
  appId: "1:334134080617:web:42d54f3049b9ff90471ef8"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const convertCollectionSnapshotToMap = (collections) =>{

  const transformedCollection = collections.docs.map(doc => {
    const {title,items} = doc.data();
    return {
      routname:encodeURI(title.toLowerCase()),
      id:doc.id,
      title,
      items
    }
  })
  return transformedCollection.reduce((accumulator,collection)=>{
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  },{})
  
}
// export const  addCollectionAndDocuments = async (collectionKey,objectsToAdd)=>{
//   const collectionRef = firestore.collection(collectionKey)
// console.log('collectionRef:',collectionRef)
// const batch = firestore.batch();
// objectsToAdd.forEach(obj =>{
//   const newDocRef = collectionRef.doc()
//   batch.set(newDocRef,obj)
//   console.log(newDocRef)

// })
// return await batch.commit()
// }

export const getCurrentUser = () =>{
  return new Promise((resolve,reject) => {
const unsubscribe = auth.onAuthStateChanged(userAuth =>{
  unsubscribe();
  resolve(userAuth)
},reject)

  }

  )
}
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
