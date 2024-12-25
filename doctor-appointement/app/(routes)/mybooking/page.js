"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllappointementsRoute, getAppointementsbyUserIdRoute, getUserDetailsRoute } from '@/app/_utils/GlobalApi';
import CancelAppointement from './_components/CancelAppointement';
import { useRouter, usePathname } from 'next/navigation';

function MyBooking() {
  const [appointements, setappointements] = useState([]);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();
  const [userId, setUserId] = useState(null); // Declare userId state
  const [loading, setLoading] = useState(true); // Declare loading state


  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
          router.push('/login'); // Redirect to login if there's an error (e.g., not authenticated)
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserRole();
    }, [router]);

  // Fetch logged-in user's details
  useEffect(() => {
    axios.get(getUserDetailsRoute, { withCredentials: true })
      .then(response => {
        if (response.data.status === true) {
          const user = response.data.user;
          console.log(response.data)
          setUserId(user._id);  // Store the user ID
        }
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);
  
  // get all appointement api req
  {/*  useEffect(() => {
    const fetchappointements = async () => {
      try {
        const response = await axios.get(getAllappointementsRoute);
        if (response.data.appointements) {
          setappointements(response.data.appointements);
        } else {
          console.error('appointements data not found in response:', response.data);
          setError("Failed to load appointements.");
        }
      } catch (error) {
        console.error("Error fetching appointements:", error.message);
        setError("Failed to load appointements.");
      }
    };
    fetchappointements();
  }, []); */}

  // get appointement by user id api req (only logged user appointements)
  useEffect(() => {
    if (userId) {
      const fetchAppointmentsByUserId = async () => {
        try {
          setLoading(true); // Start loading
          const response = await axios.get(`${getAppointementsbyUserIdRoute}/${userId}`);
          console.log(response.data.appointments);
          if (response.data.appointments) {
            setappointements(response.data.appointments);
          } else {
            console.error('Appointments data not found in response:', response.data);
            setError("Failed to load appointments.");
          }
        } catch (error) {
          console.error("Error fetching appointments:", error.message);
          setError("Failed to load appointments.");
        } finally {
          setLoading(false); // End loading
        }
      };
      fetchAppointmentsByUserId();
    }
  }, [userId]);

  return (
    <>
      <div className='px-4 sm:px-2 mt-5'>
        <h2 className='font-bold text-2xl'>My Booking</h2>
      </div>

      <div className='border border-gray-300 mt-5 rounded-md p-4 mb-20'>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16a8 8 0 0 1 0 16Z"></path>
              </svg>
              <p className="mt-2 text-gray-500">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">
            {error}
          </div>
        ) : appointements.length > 0 ? (
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Doctor</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Time</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">rejection Reason</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointements.map((appointement) => (
                  <tr key={appointement._id}>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">{appointement.doctor?.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">{appointement.user?.email}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">{new Date(appointement.date).toLocaleDateString()}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">{appointement.time}</td>
                    <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
                      <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${getStatusColor(appointement.status)}`}>
                        {appointement.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">later....</td>
                    <td className="whitespace-nowrap  py-2 ">
                      {appointement.status === 'pending' && (
                        <CancelAppointement appointement={appointement} />
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            You don't have any appointments.
          </div>
        )}
      </div>
    </>
  );
}

export default MyBooking;
