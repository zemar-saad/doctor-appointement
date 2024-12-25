"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

import DoctorDetails from '../_components/DoctorDetails';
import { getAllDoctorsRoute, getDoctorsByIdRoute, getUserDetailsRoute } from '@/app/_utils/GlobalApi';
import SuggestedDoctors from '../_components/SuggestedDoctors';

function Details() {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();




  // fetch the user role 
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Make sure to include credentials (cookies) in the request
        const response = await axios.get(getUserDetailsRoute, {
          withCredentials: true, // Include credentials (session cookies)
        });

        const user = response.data.user;

        if (user && user.role === 'doctor') {
          // Redirect doctors to unauthorized page
          router.push('/unauthorized');
        }
      } catch (err) {
        // If error occurs (e.g., user is not logged in), allow access
        console.error('Error fetching user details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [router]);


  // fetching doctors
  useEffect(() => {
    const doctorIndex = parseInt(pathname.split('/').pop(), 10) - 1;

    const fetchDoctorByIndex = async () => {
      try {
        setIsLoading(true);
        const allDoctorsResponse = await axios.get(getAllDoctorsRoute);
        const selectedDoctor = allDoctorsResponse.data[doctorIndex];

        if (selectedDoctor) {
          const doctorDetailsResponse = await axios.get(`${getDoctorsByIdRoute}/${selectedDoctor._id}`);
          setDoctor(doctorDetailsResponse.data);
        } else {
          setError("Doctor not found.");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching doctor details:", error.message);
        setError("Failed to load doctor details.");
        setIsLoading(false);
      }
    };

    fetchDoctorByIndex();
  }, [pathname]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!doctor) return <p>No doctor found.</p>;

  return (
    <div className="p-5 md:px-10 mb-5">
      <h2 className="text-2xl font-bold mb-3 px-10">Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        <DoctorDetails doctor={doctor} />
        <div className='ml-2 border-[1px] border-gray-300 rounded-lg'>
          {/* Pass the current doctor’s _id */}
          <SuggestedDoctors currentDoctorId={doctor._id} />
        </div>
      </div>
    </div>
  );
}

export default Details;
