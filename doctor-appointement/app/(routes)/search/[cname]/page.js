"use client";
import React, { useEffect, useState } from 'react';
import { getAllDoctorsRoute, getDoctorsByCategoryRoute, getUserDetailsRoute } from '@/app/_utils/GlobalApi';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

function Search() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Store doctors filtered by category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();


    // fetch the user role 
    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          // Make sure to include credentials (cookies) in the request
          const response = await axios.get(getUserDetailsRoute, {
            withCredentials: true, // Include credentials (session cookies)
          });
          
          const user = response.data.user;
  
          // Check the role and handle unauthorized access
          if (user.role === 'doctor') {
            console.log(user.role)
            // If user is a doctor and shouldn't be on this page, redirect
            router.push('/unauthorized'); // Or redirect to a doctor-specific page
          } else {
            // If role is valid for this page (e.g., patient), store the role
            setRole(user.role);
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
          setError('Failed to verify user role.');
          //router.push('/login'); // Redirect to login if there's an error (e.g., not authenticated)
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserRole();
    }, [router]);

  // Extract selectedCategory from the URL
  const pathname = usePathname();
  const selectedCategory = pathname.split('/')[2]; // Adjust according to your URL structure

  // Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(getAllDoctorsRoute); // Fetch all doctors
        setDoctors(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // fetch doctors by the category id (might be needed later)
  {/*  useEffect(() => {
    const getDoctorsByCategory = async (categoryName) => {
      try {
        const response = await axios.get(getDoctorsByCategoryRoute, {
          params: { categoryName },
        });

        setDoctors(response.data); // Assume response data is an array of doctors
        setError(null);
      } catch (error) {
        setError("Error fetching doctors by category");
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory) {
      getDoctorsByCategory(selectedCategory);
    }
  }, [selectedCategory]);*/}

  // Filter doctors by category after fetching all doctors
  useEffect(() => {
    if (selectedCategory && doctors.length) {
      const filtered = doctors.filter(doctor => doctor.category?.name === selectedCategory);
      setFilteredDoctors(filtered);
    }
  }, [selectedCategory, doctors]);

  // Navigate to the details page using the doctor index
  const handleBookNow = (index) => {
    // We now map the actual doctor index (position in the all-doctors array)
    router.push(`/details/${doctors.indexOf(filteredDoctors[index]) + 1}`); // Route to the correct doctor based on index
  };

  return (
    <div className="mt-5">
      <h2 className="flex flex-col items-center font-bold text-xl mb-3">{selectedCategory}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7">
        {loading ? (
          // Skeleton loading effect
          [1, 2, 3].map((_, index) => (
            <div key={index} className="h-[220px] bg-slate-100 w-full rounded-lg animate-pulse">
              <div className="h-2/3 bg-gray-300 rounded-t-lg"></div>
              <div className="h-1/3 p-3">
                <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
                <div className="bg-gray-300 h-4 w-1/2 mb-2 rounded"></div>
                <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          filteredDoctors.map((doctor, index) => (
            <div
              key={doctor._id}
              className="border-[1px] rounded-lg p-3 hover:cursor-pointer hover:scale-105 hover:shadow-sm transition-all"
            >
              <img
                src={doctor.image}
                alt="doctor"
                className="h-[200px] w-full object-cover rounded-lg"
              />
              <div className="mt-3 items-baseline flex flex-col gap-1">
                <h2 className="text-[13px] bg-blue-100 p-1 rounded-lg px-2 text-primary">
                  {doctor.category?.name}
                </h2>
                <h2 className="font-bold">{doctor.name}</h2>
                <h2 className="text-sm text-primary">{doctor.yearsOfExperience}</h2>
                <h2 className="text-sm text-gray-500">{doctor.address}</h2>
                <button 
                  onClick={() => handleBookNow(index)} // Use the filtered index for routing
                  className="p-2 px-3 border-[1px] border-primary text-primary text-[16px] mt-2 cursor-pointer rounded-full w-full text-center hover:bg-primary hover:text-white">
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
