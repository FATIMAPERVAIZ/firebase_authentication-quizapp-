// import {
//   auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   sendEmailVerification,
//   signOut,
//   signInWithPopup,
//   GoogleAuthProvider,
//   provider,
//   getFirestore,
//   db,
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   setDoc,
//   updateDoc,serverTimestamp , arrayUnion, arrayRemove,deleteDoc
// } from "./firebase.js";

// let signUp = () => {
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("pass").value;
//   let cPassword = document.getElementById("confirm_pass").value;
//   let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
//   let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

//   let name = document.getElementById("name").value;
//   let number = document.getElementById("number").value;
//   let userData = { name, number, email, password };
//   console.log(userData);

//   if (emailRegex.test(email) && passwordRegex.test(password)) {
//     console.log("test");
//     createUserWithEmailAndPassword(auth, email, password)
//       .then(async (userCredential) => {
//         const user = userCredential.user;
//         // console.log(user);
//         alert("Account created successfully");
//         window.location.href = "./quiz.html"
//         // ________________________________Add Doc
//         //   try {
//         //     const docRef = await addDoc(collection(db, "users"), {
//         //       ...userData,
//         //       uId: user.uid,
//         //     });
//         //     console.log("Document written with ID: ", docRef.id);
//         //   } catch (e) {
//         //     console.error("Error adding document: ", e);
//         //   }
//         // ____________________________________Set Doc
//         try {
//           await setDoc(doc(db, "users", user.uid), {
//             ...userData,
//             uId: user.uid,
//           });
//           console.log("Document written with ID: ", user.uid);
//         } catch (e) {
//           console.error("Error adding document: ", e);
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//         alert(error.code);
//       });
//   } else {
//     alert("Invalid email or Password");
//   }
//   if (password !== cPassword) {
//     alert("Passwords should be identical");
//   }
// };
// if (window.location.pathname !== "/login.html") {
//   let signUp_btn = document.getElementById("signUp_btn");
//   signUp_btn.addEventListener("click", signUp);
// }
// let logIn = () => {
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("pass").value;
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       alert("Login Successful");
//       window.location.href = "./quiz.html";
//     })
//     .catch((error) => {
//       alert(error.code);
//     });
// };
// if (window.location.pathname == "/login.html") {
//   let login_btn = document.getElementById("login_btn");
//   login_btn.addEventListener("click", logIn);
// }
// let googleSignup = () => {
//   signInWithPopup(auth, provider)
//     .then(async(result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const user = result.user;
//       console.log(user);
//       // window.location.href = "./index.html";
//     })
//     .catch((error) => {
//       const email = error.customData.email;
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       console.log(email, credential);
//     });
// };
// if (window.location.pathname == "/index.html") {
//   let googleBtn = document.getElementById("googleBtn");
//   googleBtn.addEventListener("click", googleSignup);
// }
// // document.getElementById("logOut").addEventListener("click",()=>{
// //     signOut(auth).then(() => {
// //         alert("Log out successfull")
// //         window.location.href = "../index.html"
// //       }).catch((error) => {
// //         console.log(error.code);

// //       });
// // })

// //Getting user data from firestore
// let getAllUsers = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => `, doc.data());
//   });
// };
// getAllUsers();

// let updateProfile = async () => {
//   // console.log("test");
//   let name = document.getElementById("name").value;
//   let number = document.getElementById("number").value;
//   console.log(auth.currentUser.uid);
//   let id = auth.currentUser.uid;
//   try {
//     const washingtonRef = doc(db, "users", id);
//     await updateDoc(washingtonRef, 
//       {name,
//       number,
//       timestamp: serverTimestamp(), 
//       class:"10th",
//       subjects: ["Eng", "Math", "Sci"],
//       subjects: arrayUnion("Urdu"),
//       subjects:arrayRemove("Math")
//     }
//     );
//     console.log("Updated");
    
//   } catch (e) {
//     console.log(e);
//   }
// };
// let update_btn = document.querySelector("#update_btn");
// update_btn.addEventListener("click", updateProfile);


// let deleteAccount=async()=>{
//   let id = auth.currentUser.uid
//   console.log(id);
//   await deleteDoc(doc(db, "users", id));
//   console.log("Account Deleted");
// }
// let delete_btn = document.getElementById("delete_btn")
// delete_btn.addEventListener("click", deleteAccount)


import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  provider,
  getFirestore,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc, serverTimestamp, arrayUnion, arrayRemove, deleteDoc
} from "./firebase.js";

// onAuthStateChanged listener to track user login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in: ", user);
    // You can handle user-specific logic here, like showing user profile
  } else {
    console.log("No user logged in");
  }
});

// Sign-up function
let signUp = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  let cPassword = document.getElementById("confirm_pass").value;
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  let name = document.getElementById("name").value;
  let number = document.getElementById("number").value;
  let userData = { name, number, email, password };

  if (emailRegex.test(email) && passwordRegex.test(password)) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // Sign-up successful, automatically logged in
        alert("Account created successfully");
        window.location.href = "./quiz.html"; // Redirect after signup

        // Save user data to Firestore
        try {
          await setDoc(doc(db, "users", user.uid), {
            ...userData,
            uId: user.uid,
          });
          console.log("Document written with ID: ", user.uid);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.code);
      });
  } else {
    alert("Invalid email or Password");
  }

  if (password !== cPassword) {
    alert("Passwords should be identical");
  }
};

// Log in function
let logIn = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login Successful");
      window.location.href = "./quiz.html"; // Redirect after login
    })
    .catch((error) => {
      alert(error.code);
    });
};

// Google Sign-in function
let googleSignup = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      // Handle Google sign-in success
      // You can add user info to Firestore if needed
    })
    .catch((error) => {
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, credential);
    });
};

// Add event listeners based on page
if (window.location.pathname !== "/login.html") {
  let signUp_btn = document.getElementById("signUp_btn");
  signUp_btn.addEventListener("click", signUp);
}

if (window.location.pathname == "/login.html") {
  let login_btn = document.getElementById("login_btn");
  login_btn.addEventListener("click", logIn);
}

if (window.location.pathname == "/index.html") {
  let googleBtn = document.getElementById("googleBtn");
  googleBtn.addEventListener("click", googleSignup);
}

// Function to update profile
let updateProfile = async () => {
  // Check if user is logged in
  if (auth.currentUser) {
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let id = auth.currentUser.uid;

    try {
      // Create or update document with merge option
      const userRef = doc(db, "users", id);
      
      // If the document does not exist, it will be created, and if it exists, it will be updated.
      await setDoc(userRef, {
        name,
        number,
        timestamp: serverTimestamp(),
        class: "10th",
        subjects: ["Eng", "Math", "Sci"],
        subjects: arrayUnion("Urdu"),
        subjects: arrayRemove("Math")
      }, { merge: true });
      
      console.log("Document updated/created with ID: ", id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  } else {
    console.log("No user is logged in to update profile");
  }
};

let update_btn = document.querySelector("#update_btn");
update_btn.addEventListener("click", updateProfile);

let deleteAccount = async () => {
  try {
    // Get the current user ID
    let user = auth.currentUser;
    let id = user.uid;

    // First, delete the Firestore document
    await deleteDoc(doc(db, "users", id));
    console.log("Firestore document deleted");

    // Then, delete the user from Firebase Authentication
    await user.delete();
    console.log("User deleted from Firebase Authentication");

    // Optionally, you can log the user out after deletion
    await signOut(auth);
    console.log("User signed out");

    // Redirect to home page or login page after deletion
    window.location.href = "./login.html";
  } catch (e) {
    console.log("Error deleting account:", e);
    alert("Error deleting account. Please try again.");
  }
};

let delete_btn = document.getElementById("delete_btn");
delete_btn.addEventListener("click", deleteAccount);

