import React from 'react';

const About = () => {
  return (
    <div className="container mt-2" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
      <div className="card shadow p-4 mb-2">
        <h1 className="display-4 text-center mb-4">About iNotebook</h1>
        <p className="lead text-center">
          Welcome to <strong>iNotebook</strong> – your personal online note-taking tool designed for simplicity, flexibility, and security.
          Whether you're organizing ideas, creating to-do lists, or keeping track of important tasks, iNotebook provides a seamless experience
          for creating, updating, and deleting notes, all in one secure platform.
        </p>

        <h2 className="mt-5">Key Features:</h2>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>Create and Manage Notes</strong>: Easily create new notes with just a few clicks. Update or delete them whenever necessary, keeping your workspace tidy and relevant.
          </li>
          <li className="list-group-item">
            <strong>Secure Login</strong>: Your data's privacy is our top priority. Access your notes securely with login credentials, ensuring that only you can view and manage your content.
          </li>
          <li className="list-group-item">
            <strong>Anywhere, Anytime Access</strong>: Access your notes from any device, at any time. With iNotebook, your important thoughts are always within reach.
          </li>
        </ul>

        <p className="lead text-center">
          Start organizing your life today with iNotebook – your secure, online notepad.
        </p>
      </div>

      <div className="card shadow p-2">
        <p className="text-center mb-0" style={{ color:'red' }}>
          <strong>This site is developed by Mr. Vishwajit Vijay Mavalankar in 2024.</strong>
        </p>
      </div>
    </div>
  );
};

export default About;
