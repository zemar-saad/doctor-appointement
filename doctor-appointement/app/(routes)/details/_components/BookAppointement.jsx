import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner"

import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createappointementRoute, getUserDetailsRoute } from '@/app/_utils/GlobalApi';

function Bookappointement({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [note, setNote] = useState('');
  const [userId, setUserId] = useState(null); // State to hold the user ID

  // Fetch available time slots
  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      if (i !== 6) {
        timeList.push({ time: i + ":30 PM" });
      }
    }
    setTimeSlot(timeList);
  };

  useEffect(() => {
    getTime();
  }, []);

  // Fetch logged-in user's details
  useEffect(() => {
    axios.get(getUserDetailsRoute, { withCredentials: true })
      .then(response => {
        if (response.data.status === true) {
          const user = response.data.user;
          setUserId(user._id);  // Store the user ID
        }
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);


  //create appointement api req
  const handleSubmit = async () => {
    const doctorId = doctor._id; // Assuming doctor information is passed as a prop

    if (!userId) {
      return alert('User not authenticated.');
    }

    try {
      const response = await axios.post(createappointementRoute, {
        userId,
        date,
        time: selectedTimeSlot,
        doctorId,
        note: note
      });

      if (response.status === 201) {
        toast('appointement booked successfully!');
        // Optionally, you can reset the form here
      } else {
        alert('Failed to book appointement.');
      }
    } catch (error) {
      console.error('Error booking appointement:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Disable the "Book" button if either the date or time slot is not selected
  const isButtonDisabled = !date || !selectedTimeSlot;

  return (
    <Dialog>
      <DialogTrigger>
        <button className="p-2 px-3 border-[1px] text-white bg-primary mt-3 cursor-pointer rounded-full text-center">
          Book appointement
        </button>
      </DialogTrigger>
      <DialogContent className="lg:max-h-[90vh] lg:overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Book appointement</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className='flex flex-col gap-2 items-baseline'>
              <h2 className='flex gap-2 items-center mt-3'>
                <CalendarDays className='text-primary h-5 w-5 '/>
                Select Date
              </h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(day) => day < new Date()}
                className="rounded-md border mt-1"
              />
            </div>

            <div className='mt-3'>
              <h2 className='flex gap-2 items-center mb-3'>
                <Clock className='text-primary h-5 w-5'/>
                Select Time
              </h2>
              <div className='grid grid-cols-3 gap-2 rounded-md border p-5'>
                {timeSlot.map((item, index) => (
                  <h2 
                    onClick={() => setSelectedTimeSlot(item.time)}
                    className={`p-2 border rounded-md text-center cursor-pointer 
                    ${selectedTimeSlot === item.time ? "bg-primary text-white" : ""}`} 
                    key={index}>
                    {item.time}
                  </h2>
                ))}
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <label htmlFor="note" className='block text-sm font-medium text-gray-700'>Note (optional)</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </DialogDescription>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button 
              type="button" 
              style={{ 
                color: '#f56565', 
                borderColor: '#f56565', 
                backgroundColor: '#ffffff', 
                boxShadow: 'none'
              }}
              className="hover:bg-transparent border focus:outline-none border-red-500"
            >
              Close
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            className='bg-primary text-white' 
            onClick={handleSubmit}
            disabled={isButtonDisabled}  // Disable button if date or time slot is not selected
          >
            Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Bookappointement;
