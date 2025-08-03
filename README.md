Social Media Platform (MERN Stack)
Project Overview
This is a full-stack social media application built with the MERN (MongoDB, Express, React, Node.js) stack. The platform is designed to provide a modern and interactive user experience, allowing individuals to connect, share posts, and engage with content. It serves as a strong demonstration of building a complete, responsive, and data-driven web application from the ground up.

Key Features
User Authentication: Secure user registration and login functionality using JSON Web Tokens (JWT) for a protected API.

Dynamic User Profiles: Each user has a unique profile page where they can view their posts, manage their follower/following lists, and update their profile picture and bio.

Image-Based Posts: Users can create and upload new posts that include an image and a text caption.

Interactive Feed: The home page displays a feed of posts from all users, with options to like, comment, and follow the post's author directly from the feed.

Following System: A robust follow/unfollow system allows users to curate their feed and connect with others.

Responsive Design: The application's UI is optimized for a seamless experience on both desktop and mobile devices.

Technology Stack
This project leverages a powerful and popular stack for modern web development.

Frontend
React.js: A declarative and component-based library for building the user interface.

React Router: Manages client-side routing to create a single-page application experience.

Axios: A promise-based HTTP client used to make API calls to the backend.

HTML5 & CSS3: Core languages for structuring and styling the application, with a focus on modern, clean design.

Backend
Node.js: The JavaScript runtime environment that powers the server.

Express.js: A fast and minimalist web framework for building the RESTful API endpoints.

JWT (JSON Web Tokens): Used for secure, stateless authentication.

Database
MongoDB: A flexible NoSQL database used to store all application data, including users, posts, and comments.

🚀 Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js (v14 or higher) and npm

MongoDB installed and running

Installation
Clone the repository:

git clone https://github.com/ehtishamnvd/CodeAlpha_SocialMediaPlatform.git
cd CodeAlpha_SocialMediaPlatform

Set up the Backend:
Navigate to the backend directory, install the dependencies, and start the server.

cd backend
npm install

Create a .env file and add the following configuration:

MONGO_URI=mongodb://localhost:27017/social-media-db
PORT=3001
JWT_SECRET=your_secret_key_here

Start the backend server:

npm start

Set up the Frontend:
Open a new terminal, navigate to the frontend directory, and start the development server.

cd ../frontend
npm install
npm start

The application should now be accessible in your web browser at http://localhost:3000.

Future Enhancements
User Search: Implement a search bar to find users by their username.

Notification System: Add real-time notifications for new likes, comments, and followers.

Direct Messaging: Develop a direct messaging feature for private user-to-user communication.

Post Editing: Allow users to edit or delete their posts.
