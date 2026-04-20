import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    if (!username || !password) {
      alert("Please provide both username and password.");
      return;
    }

    // Insert into Supabase users table
    const { data, error } = await supabase
      .from("user")
      .insert([{ username: username, password: password }]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Registration failed: " + error.message);
    } else {
      alert("Registration successful!");
      window.location.href = "login.html";
    }
  });
});
