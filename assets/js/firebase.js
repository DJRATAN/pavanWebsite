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



// Form submission logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const mobilenumber = form.mobilenumber.value;
    const email = form.email.value;
    const domain = form.domain.value;
    const service = form.service.value;

    try {
      // Push data to Firebase Realtime Database
      const dbRef = ref(database, 'contact-page'); // 'contacts' is the database node
      await push(dbRef, {
        firstname,
        lastname,
        mobilenumber,
        email,
        domain,
        service,
        timestamp: new Date().toISOString(),
      });

      // Show success message
      document.querySelector('.sent-message').style.display = 'block';
      document.querySelector('.error-message').style.display = 'none';
      form.reset();


      // Hide success message after 10 seconds
      setTimeout(() => {
        document.querySelector('.sent-message').style.display = 'none';
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);

      // Show error message
      document.querySelector('.error-message').style.display = 'block';
      document.querySelector('.error-message').textContent = 'Error submitting form. Please try again.';

      // Hide error message after 10 seconds
      setTimeout(() => {
        document.querySelector('.error-message').style.display = 'none';
      }, 5000);


    } finally {
      document.querySelector('.loading').style.display = 'none';
    }
  });
});

