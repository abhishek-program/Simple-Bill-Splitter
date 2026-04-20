document.addEventListener("DOMContentLoaded", () => {
    // Check if the user is logged in
    const username = localStorage.getItem("username");

    // If no username is found in localStorage, redirect to the login page
    if (!username) {
        window.location.href = "login.html";
    } else {
        // Display the user's name or welcome message on the Expense Splitter page
        document.getElementById("welcomeMessage").textContent = `Welcome, ${username}!`;
    }

    // Handle logout functionality (optional)
    document.getElementById("logoutButton").addEventListener("click", () => {
        // Clear the user session (remove username from localStorage)
        localStorage.removeItem("username");

        // Redirect back to the login page
        window.location.href = "login.html";
    });
});
