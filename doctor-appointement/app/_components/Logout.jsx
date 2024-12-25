"use client";
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { logoutRoute } from '../_utils/GlobalApi';
import { Button } from '@/components/ui/button';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post(logoutRoute, {}, { withCredentials: true });

      console.log("Logout Response:", response.data); // Debug response
      if (response.status === 200 && response.data.status) {
        localStorage.clear();
        console.log("Local storage cleared.");
        router.push('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Logout
    </Button>
  );
};

export default Logout;
