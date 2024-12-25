"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getAllDoctorsRoute } from '../_utils/GlobalApi';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(getAllDoctorsRoute);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
        setError("Failed to load doctors.");
      }
    };
    fetchDoctors();
  }, []);

  const handleBookNow = (index) => {
    const isLoggedIn = localStorage.getItem('logged') === 'true';

    if (isLoggedIn) {
      // Use the index in the URL, but pass the real ID in the background
      router.push(`/details/${index + 1}`); // URL will have /details/1, /details/2, etc.
    } else {
      router.push('/login');
    }
  };

  return (
    <div className='mb-10 px-8'>
      <h2 className='flex flex-col items-center font-bold text-xl mb-3'>Doctors List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7'>
        {doctors.length === 0 ? (
                    [1, 2, 3].map((item, index) => (
                        <div key={index} className='h-[220px] bg-slate-100 w-full rounded-lg animate-pulse'>
                            <div className='h-2/3 bg-gray-300 rounded-t-lg'></div>
                            <div className='h-1/3 p-3'>
                                <div className='bg-gray-300 h-4 w-3/4 mb-2 rounded'></div>
                                <div className='bg-gray-300 h-4 w-1/2 mb-2 rounded'></div>
                                <div className='bg-gray-300 h-4 w-3/4 rounded'></div>
                            </div>
                        </div>
                    ))
                ) : (
          doctors.map((doctor, index) => (
            <div key={doctor._id} className='border-[1px] border-gray-300 rounded-lg p-3'>
              <img
                src={doctor.image}
                alt={doctor.name}
                className='h-[200px] w-full object-cover rounded-lg'
              />
              <div className='mt-3 items-baseline flex flex-col gap-1'>
                <h2 className='font-bold'>{doctor.name}</h2>
                <h2 className='text-sm text-gray-500'>{doctor.address}</h2>
                <button
                  onClick={() => handleBookNow(index)}
                  className='p-2 px-3 border-[1px] border-primary text-primary text-[16px] mt-2 cursor-pointer rounded-full w-full text-center hover:bg-primary hover:text-white'>
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

export default DoctorList;
