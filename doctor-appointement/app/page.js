"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // useRouter from Next.js for redirection
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import { getUserDetailsRoute } from "./_utils/GlobalApi";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get(getUserDetailsRoute, {
          withCredentials: true, // Ensure to include session cookies
        });
        
        const user = response.data.user;

        if (user && user.role === 'doctor') {
          // If the user is a doctor, redirect to unauthorized page
          router.push('/unauthorized');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        // If there is an error (e.g., user is not logged in), allow them to stay on the page
        // Handle non-logged-in users here if needed
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>; // Optional: You can show a loading spinner here if you want
  }

  return (
    <div>
      {/* Hero section */}
      <Hero />

      {/* SearchBar + Category */}
      <CategorySearch />

      {/* DoctorList */}
      <DoctorList />
    </div>
  );
}
