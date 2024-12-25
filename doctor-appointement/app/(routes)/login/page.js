"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loginRoute } from '@/app/_utils/GlobalApi';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('logged') === 'true') {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginRoute, {
        username,
        password
      }, { withCredentials: true }); // Include session cookies
      
      if (response.data.status === true) {
        // No need to store user role in localStorage, keep it in session
        const { user } = response.data; // Ensure the user details are returned by the backend
        
        // Store essential user info in session storage if needed
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('email', user.email);
        localStorage.setItem('logged', 'true');
        
        // Redirect based on role
        if (user.role === 'patient') {
          router.push('/'); // Redirect patient to homepage
        } else if (user.role === 'doctor') {
          router.push('/bookingfordoctor'); // Redirect doctor to doctor-specific page
        }
        
      } else {
        setError(response.data.msg || "Login failed.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid username or password.");
    }
  };
  

  

  return (
    <div className="w-screen h-screen flex bg-black">
      <div className="w-full max-w-md p-8 bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
