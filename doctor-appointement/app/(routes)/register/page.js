"use client";

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { registerRoute } from '@/app/_utils/GlobalApi'; // Ensure this points to the correct API endpoint

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem('logged'=== true);
   
   // If not logged in, redirect to the login page
   if (localStorage.getItem('logged') === 'true' ) {
     router.push('/');
   } 
 }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(registerRoute, {
        username,
        email,
        password
      });

      // Handle successful registration
      if (response.status === 200 && response.data.status) {
        localStorage.setItem('logged', 'true');
        router.push('/login'); // Redirect to login page
      } else {
        setError(response.data.msg || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="w-screen h-screen flex bg-black">
      <div className="w-full max-w-md p-8 bg-white shadow-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
