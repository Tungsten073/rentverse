const firebaseConfig = {
    apiKey: "AIzaSyCVdktITYy5NTg411nQv45lpRb5Cd9deE8",
    authDomain: "rentr-4fbbd.firebaseapp.com",
    projectId: "rentr-4fbbd",
    storageBucket: "rentr-4fbbd.firebasestorage.app",
    messagingSenderId: "329030078791",
    appId: "1:329030078791:web:6d17bf205bd8fbfee3fc62",
    measurementId: "G-65H7HD66C9"
  };
  firebase.initializeApp(firebaseConfig);
  window.auth = firebase.auth();