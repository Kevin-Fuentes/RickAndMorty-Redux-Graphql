import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
     apiKey: "AIzaSyCgF3bkCVw7Zs_uugYXh6slgy5VMRd9ulE",
     authDomain: "rick-and-morty-80bbe.firebaseapp.com",
     databaseURL: "https://rick-and-morty-80bbe.firebaseio.com",
     projectId: "rick-and-morty-80bbe",
     storageBucket: "rick-and-morty-80bbe.appspot.com",
     messagingSenderId: "476594666559",
     appId: "1:476594666559:web:70caf8590ee4fae33c8c8a"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   
   const db =  firebase.firestore().collection('favs')



export const getFavs= async(uid)=>{

  try {
    const res = await db.doc(uid).get()
    const resultado  = res.data().favorites 
    return resultado
  } catch (error) {
    return db.doc(uid).set({favorites:[]})
  }


  

 
  }
  



export function updateDB(array,uid){
return db.doc(uid).set({favorites:[...array]})
.then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});
}


   export const loginWithGoogle = () => {
     const provider = new firebase.auth.GoogleAuthProvider()
    return  firebase.auth().signInWithPopup(provider)
    .then(snap=>snap.user)
   }

   export const singOutGoogle =()=>{
      firebase.auth().signOut()
   }