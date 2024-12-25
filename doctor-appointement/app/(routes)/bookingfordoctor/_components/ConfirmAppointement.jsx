"use client";
import React from 'react';
import axios from 'axios';


import { Button } from '@/components/ui/button';
import { updateAppointementsRoute } from '@/app/_utils/GlobalApi';

const ConfirmAppointement = ({appointement}) => {
  
  const handleSubmit = async () => {
    const appointementId = appointement._id 

    try {
      const response = await axios.patch(`${updateAppointementsRoute}/${appointementId}`,{
        status: 'confirmed'

      })
        if(response.status=true) {
        alert('appointement confirmed successfully!');
        window.location.reload()
      } else {
        alert('Failed to confirm appointement. Please try again.')
      }
        
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  return (
    <button
      onClick={handleSubmit}
       className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium border border-green-500 text-white ">     
    
      Confirm
    </button>
  );
};

export default ConfirmAppointement;
