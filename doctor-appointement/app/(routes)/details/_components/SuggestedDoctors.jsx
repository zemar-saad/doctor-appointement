"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllDoctorsRoute } from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';

function SuggestedDoctors({ currentDoctorId }) {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [originalDoctors, setOriginalDoctors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);

        // Fetch all doctors
        const response = await axios.get(getAllDoctorsRoute);
        const allDoctors = response.data;

        // Store the original list of doctors
        setOriginalDoctors(allDoctors);

        // Filter out the current doctor from the suggestion list
        const filteredDoctors = allDoctors.filter(doctor => doctor._id !== currentDoctorId);

        setDoctors(filteredDoctors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching suggested doctors:", error.message);
        setError("Failed to load suggested doctors.");
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [currentDoctorId]);

  const handleBookNow = (index) => {
    // Find the doctor's original index from the original list
    const originalDoctor = originalDoctors.find(doctor => doctor._id === doctors[index]._id);
    const originalIndex = originalDoctors.indexOf(originalDoctor);
    
    if (originalIndex !== -1) {
      router.push(`/details/${originalIndex + 1}`); // Use the original index for routing
    }
  };

  if (isLoading) return <p>Loading suggested doctors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (doctors.length === 0) return <p>No other doctors found.</p>;

  // Limit the number of doctors displayed to 2
  const doctorsToDisplay = doctors.slice(0, 2);

  return (
    <div className='mb-10 px-8'>
      <h2 className='flex flex-col items-center font-bold text-xl mt-1 mb-3'>Suggestions</h2>
      <div className='flex flex-col gap-3'>
        {doctorsToDisplay.map((doctor, index) => (
          <div key={doctor._id} className='border-[1px] border-gray-300 rounded-lg p-3 hover:cursor-pointer hover:scale-105 hover:shadow-sm transition-all'>
            <img 
              src={doctor.image} 
              alt="Doctor"
              width={200} 
              height={180} 
              className='h-[180px] w-full object-cover rounded-lg' 
            />
            <div className='mt-3 items-baseline flex flex-col gap-0.5'>
              <h2 className='text-[13px] bg-blue-100 p-1 rounded-lg px-2 text-primary'>{doctor.category?.name}</h2>
              <h2 className='font-bold'>{doctor.name}</h2>
              <button 
                onClick={() => handleBookNow(index)} 
                className='p-2 px-3 border-[1px] border-primary text-primary text-[16px] mt-1 cursor-pointer rounded-full w-full text-center hover:bg-primary hover:text-white'>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedDoctors;
