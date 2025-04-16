<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RentVerse Login</title>
    <link rel="stylesheet" href="style.css">
    <!-- Add Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
</head>
<body>

<div class="container" id="container">
    <div id="auth-message"></div> 
    <div class="form-container sign-up-container">
        <form id="signup-form">
            <h1>Create Account</h1>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
    </div>

    <div class="form-container sign-in-container">
        <form id="signin-form">
            <h1>Sign in</h1>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    </div>

    <div class="overlay-container">
        <div class="overlay">
            <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us, please login with your credentials</p>
                <button class="ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your details and start your journey with us</p>
                <button class="ghost" id="signUp">Sign Up</button>
            </div>
        </div>
    </div>

    <button id="sign-out-button" style="margin-top: 20px; display: none;">Sign Out</button>
</div>

<!-- Firebase config script -->
<script>
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
</script>

<script src="script.js"></script>
</body>
</html>