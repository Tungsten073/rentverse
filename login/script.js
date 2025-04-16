document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const signUpForm = document.getElementById('signup-form');
    const signInForm = document.getElementById('signin-form');
    const signOutButton = document.getElementById('sign-out-button');
    const authMessage = document.getElementById('auth-message');

    // Toggle between sign-in and sign-up panels
    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
    }

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    function showMessage(msg, isError = false) {
        authMessage.textContent = msg;
        authMessage.style.color = isError ? 'red' : 'green';
        authMessage.style.display = 'block';
        authMessage.style.marginBottom = '10px';
        authMessage.style.textAlign = 'center';
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Check if user is already logged in
    window.auth.onAuthStateChanged((user) => {
        if (user) {
            signOutButton.style.display = 'block';
            const userEmail = getCookie('user_email');
            const userName = getCookie('user_name');
            if (userEmail && userName) {
                showMessage(`Logged in as ${userName} (${userEmail})`);
            }
        } else {
            signOutButton.style.display = 'none';
        }
    });

    if (signUpForm) {
        signUpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = signUpForm.querySelector('[name="name"]').value.trim();
            const email = signUpForm.querySelector('[name="email"]').value.trim();
            const password = signUpForm.querySelector('[name="password"]').value;

            try {
                showMessage("Creating account...");
                const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
                await userCredential.user.updateProfile({ displayName: name });
                document.cookie = `user_email=${email}; path=/`;
                document.cookie = `user_name=${name}; path=/`;
                showMessage("Signup successful! Redirecting...");
                setTimeout(() => window.location.href = "../index.php", 1500);
            } catch (error) {
                showMessage("Signup failed: " + error.message, true);
            }
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = signInForm.querySelector('[name="email"]').value.trim();
            const password = signInForm.querySelector('[name="password"]').value;
            
            try {
                showMessage("Logging in...");
                const userCredential = await window.auth.signInWithEmailAndPassword(email, password);
                const user = userCredential.user;
                document.cookie = `user_email=${email}; path=/`;
                document.cookie = `user_name=${user.displayName || "User"}; path=/`;
                showMessage("Login successful! Redirecting...");
                setTimeout(() => window.location.href = "../index.php", 1500);
            } catch (error) {
                showMessage("Login failed: " + error.message, true);
            }
        });
    }

    if (signOutButton) {
        signOutButton.addEventListener('click', async () => {
            try {
                await window.auth.signOut();
                document.cookie = "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                showMessage("Signed out successfully");
                setTimeout(() => window.location.reload(), 1000);
            } catch (error) {
                showMessage("Sign out failed: " + error.message, true);
            }
        });
    }
});