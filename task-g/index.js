// index.js
// Author: Digamber shrestha
// Date: 2025-10-31
// Custom form validation and dynamic table row appending

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tbody = document.querySelector("#dataTable tbody");
  const timestampInput = document.getElementById("timestamp");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset previous errors
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

    // Collect form data
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const birthDate = form.birthDate.value;
    const terms = form.terms.checked;
    let isValid = true;

    // Fill timestamp automatically
    const timestamp = new Date().toLocaleString();
    timestampInput.value = timestamp;

    // --- VALIDATION ---

    // Full name: required, at least 2 words, each ≥2 chars
    const nameParts = fullName.split(" ").filter(Boolean);
    if (nameParts.length < 2 || nameParts.some((p) => p.length < 2)) {
      document.getElementById("nameError").textContent =
        "Please enter your full name (first and last, each at least 2 characters).";
      isValid = false;
    }

    // Email: basic regex check
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address (e.g., name@example.com).";
      isValid = false;
    }

    // Phone: must match +358XXXXXXXXX
    const phonePattern = /^\+358\d{7,10}$/;
    if (!phonePattern.test(phone)) {
      document.getElementById("phoneError").textContent =
        "Phone number must start with +358 followed by 7–10 digits.";
      isValid = false;
    }

    // Birth date: must not be in the future, min age 13
    if (!birthDate) {
      document.getElementById("birthError").textContent =
        "Please select your birth date.";
      isValid = false;
    } else {
      const birth = new Date(birthDate);
      const today = new Date();
      if (birth > today) {
        document.getElementById("birthError").textContent =
          "Birth date cannot be in the future.";
        isValid = false;
      } else {
        const age = today.getFullYear() - birth.getFullYear();
        if (age < 13) {
          document.getElementById("birthError").textContent =
            "You must be at least 13 years old.";
          isValid = false;
        }
      }
    }

    // Terms: must be checked
    if (!terms) {
      document.getElementById("termsError").textContent =
        "You must accept the terms before submitting.";
      isValid = false;
    }

    // Stop on invalid input
    if (!isValid) return;

    // --- ADD VALID ROW ---
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${timestamp}</td>
      <td>${fullName}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${birthDate}</td>
    `;
    tbody.appendChild(row);

    // Reset form and focus
    form.reset();
    form.fullName.focus();
  });
});
