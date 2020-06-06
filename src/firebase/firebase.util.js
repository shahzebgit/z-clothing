import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBRTTipcgNEUhRhxZ78ql_gh8MSsVyUEcI",
  authDomain: "z-clothing.firebaseapp.com",
  databaseURL: "https://z-clothing.firebaseio.com",
  projectId: "z-clothing",
  storageBucket: "z-clothing.appspot.com",
  messagingSenderId: "505301158678",
  appId: "1:505301158678:web:9f7c6c4271b9608a051e37",
  measurementId: "G-XTFS2F05VD"
};

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
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  };
  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);


  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
   batch.set(newDocRef, obj);

  });

  return await batch.commit()
};

export const convertCollectionSnapshotToMap =(collections)=>{
  const transformedCollection = collections.docs.map(doc =>{
    const {title, items} = doc.data();
    
    return{
      routeName: encodeURI(title.toLowerCase()),
      id:doc.id,
      title,
      items
    }
  });
 return transformedCollection.reduce((accumulator, collection) =>{
    accumulator[collection.title.toLowerCase()]= collection;
    return accumulator;
  },{});
  
}



firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export  const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;