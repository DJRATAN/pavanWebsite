// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpYe-UFZwL0TzLxToOflI4115n0k7yU2c",
  authDomain: "codingcreators-9c318.firebaseapp.com",
  projectId: "codingcreators-9c318",
  storageBucket: "codingcreators-9c318.firebasestorage.app",
  messagingSenderId: "668175311877",
  appId: "1:668175311877:web:50d8e06ffa996f3c70686c",
  measurementId: "G-F5HCYB5VKN"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Form validation function
function validateForm() {
  let firstName = document.getElementById("firstname-field").value.trim();
  let lastName = document.getElementById("lastname-field").value.trim();
  let mobileNumber = document.getElementById("mobilenumber-field").value.trim();
  let email = document.getElementById("email-field").value.trim();
  let domain = document.getElementById("domain").value;
  let service = document.getElementById("service").value;

  let nameRegex = /^[A-Za-z]{3,30}$/;
  let mobileRegex = /^[0-9]{10}$/;
  let emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/; // Restricts special characters before @

  if (!nameRegex.test(firstName)) {
    alert("First name must be between 3 to 30 alphabetic characters only.");
    return false;
  }
  if (!nameRegex.test(lastName)) {
    alert("Last name must be between 3 to 30 alphabetic characters only.");
    return false;
  }
  if (!mobileRegex.test(mobileNumber)) {
    alert("Mobile number must be exactly 10 digits.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Email should not contain special characters like ., %, -, _ before '@'.");
    return false;
  }
  if (domain === "") {
    alert("Please select a preferred domain.");
    return false;
  }
  if (service === "") {
    alert("Please select a service.");
    return false;
  }

  return true; // Form is valid
}

// Form submission logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    // Get form values
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const mobilenumber = form.mobilenumber.value;
    const email = form.email.value;
    const domain = form.domain.value;
    const service = form.service.value;
    const message = form.message.value;

    try {
      // Show loading message
      document.querySelector('.loading').style.display = 'block';

      // Push data to Firebase Realtime Database
      const dbRef = ref(database, 'contact-page');
      await push(dbRef, {
        firstname,
        lastname,
        mobilenumber,
        email,
        domain,
        service,
        message,
        timestamp: new Date().toISOString(),
      });

      // Hide loading message and show success message
      document.querySelector('.loading').style.display = 'none';
      document.querySelector('.sent-message').style.display = 'block';
      document.querySelector('.error-message').style.display = 'none';
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        document.querySelector('.sent-message').style.display = 'none';
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);

      // Hide loading message and show error message
      document.querySelector('.loading').style.display = 'none';
      document.querySelector('.error-message').style.display = 'block';
      document.querySelector('.error-message').textContent = 'Error submitting form. Please try again.';

      // Hide error message after 5 seconds
      setTimeout(() => {
        document.querySelector('.error-message').style.display = 'none';
      }, 5000);
    }
  });
});
