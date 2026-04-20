import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      // Query Supabase table "user" for matching credentials
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single(); // Expect only one match

      if (error || !data) {
        alert("Invalid username or password. Please try again.");
      } else {
        alert("Login successful!");
        // Optional: store username in localStorage
        localStorage.setItem("loggedInUser", username);
        // Redirect to index page
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again later.");
    }
  });
});
