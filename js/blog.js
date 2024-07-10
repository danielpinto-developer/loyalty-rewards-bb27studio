// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4eMq0Y8ERerdBIzsySqtG9QnisI3CBIc",
  authDomain: "bb27studio-loyalty-program.firebaseapp.com",
  projectId: "bb27studio-loyalty-program",
  storageBucket: "bb27studio-loyalty-program.appspot.com",
  messagingSenderId: "827670961717",
  appId: "1:827670961717:web:9e7b9d33ddd047dfcc9b7c",
  measurementId: "G-Y30PX1R10P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to display blog posts
async function displayBlogPosts() {
  const blogContainer = document.getElementById("blog-container");

  try {
    const querySnapshot = await getDocs(collection(db, "blogPosts"));
    blogContainer.innerHTML = ""; // Clear previous contents

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      const postElement = document.createElement("div");
      postElement.classList.add("blog-post");
      postElement.innerHTML = `
        <h2><a href="/blog/${encodeURIComponent(doc.id)}">${
        postData.title
      }</a></h2>
        <p>Tags: ${postData.tags.join(", ")}</p>
        <p>Published on: ${new Date(
          postData.timestamp.seconds * 1000
        ).toLocaleDateString()}</p>
      `;
      blogContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching blog posts: ", error);
  }
}

// Load blog posts when the window loads
window.onload = displayBlogPosts;
