// Redirect to register page
function redirectToRegister() {
    window.location.href = 'register.html';
}

// Redirect to login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Handle user registration
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if the email is already registered
        const isRegistered = users.some(user => user.email === email);
        if (isRegistered) {
            alert('This email is already registered. Please log in.');
            redirectToLogin();
            return;
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful! Please log in.');
        redirectToLogin();
    } else {
        alert('Please fill in all fields.');
    }
});

// Handle user login
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isValidUser = users.some(user => user.email === email && user.password === password);

    if (isValidUser) {
        localStorage.setItem('userLoggedIn', email); // Set logged-in status
        sendEmail(email); // Send email notification
        window.location.href = 'index.html'; // Redirect to the homepage
    } else {
        alert('Invalid email or password.');
    }
});

// Handle logout
function logout() {
    localStorage.removeItem('userLoggedIn');
    alert('You have been logged out.');
    redirectToLogin();
}

// Ensure login to access the homepage
document.addEventListener('DOMContentLoaded', function () {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (!userLoggedIn && window.location.pathname.includes('index.html')) {
        alert('You must log in first.');
        redirectToLogin();
    }
});