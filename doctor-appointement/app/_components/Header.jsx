"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Logout from './Logout';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getUserDetailsRoute } from '../_utils/GlobalApi';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get(getUserDetailsRoute, {
          withCredentials: true, // Include credentials (session cookies)
        });

        const user = response.data.user;

        if (user) {
          setIsLoggedIn(true);
          setRole(user.role);
          if (user.role === 'doctor') {
            // Redirect doctors to unauthorized page
            //router.push('/unauthorized'); // Optional: Redirect here or handle it differently
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  const Menu = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Explore', path: '/explore' },
    { id: 3, name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className='flex items-center justify-between p-4 px-20 shadow-sm'>
      <div className='flex items-center gap-10'>
        <Image src='/logo.svg' alt='logo' width={180} height={80} />

        <ul className='md:flex gap-8 hidden'>
          {Menu.map(item => (
            <li key={item.id} className={`hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out ${role === 'doctor' && item.name === 'Home' ? 'pointer-events-none' : ''}`}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {isLoggedIn ? (
        <div className='gap-5 flex items-center'>
          <Link href={role === 'doctor' ? '/bookingfordoctor' : '/mybooking'}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {role === 'doctor' ? 'My Bookings' : 'My Booking'}
            </button>
          </Link>
          <Logout />
        </div>
      ) : (
        <Link href="/login">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
