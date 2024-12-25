import { GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import BookAppointement from './BookAppointement';

function DoctorDetails({ doctor }) {
  const SocialMedia = [
    { id: 1, icon: '/youtube.png', url: '' },
    { id: 2, icon: '/linkedin.png', url: '' },
    { id: 3, icon: '/facebook.png', url: '' },
    { id: 4, icon: '/twitter.png', url: '' },
  ];



  return (
    <>
      <div className="col-span-3 sm:grid grid-cols-1 md:grid-cols-3  px-5 border-[1px] border-gray-300 mr-2 rounded-lg">   
         
        {/* Doctor Image */}
        <div>
          <img
            src={doctor.image}
            alt={doctor.name}
            width={200}
            height={200}
            className="rounded-lg h-[280px] w-full object-cover mt-4"
          />
        </div>

        {/* Doctor Info */}
        <div className="col-span-2 mt-3 flex flex-col gap-3 items-baseline px-10">
          <h2 className="font-bold text-2xl mt-4 ">{doctor.name}</h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <GraduationCap />
            {doctor.yearsOfExperience} Years of Experience
          </h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <MapPin />
            {doctor.address}
          </h2>
          <h2 className="text-[13px] bg-blue-100 p-1 rounded-lg px-2 text-primary">
            {doctor.category?.name}
          </h2>

          <div className="flex gap-3">
            {SocialMedia.map((item, index) => (
              <Image src={item.icon} key={index} width={30} height={30} alt={`social-icon-${index}`} />
            ))}
          </div>
            <BookAppointement doctor ={doctor}/>


          {/* doctor info */}
        </div>
        <div className="mt-6  col-span-4 mb-4   ">
        <h2 className="font-bold text-[20px]">About Me</h2>
        <p className="text-gray-500 mt-3 tracking-wide">{doctor.about}</p>
        </div> 
      
      </div>
                
     
      
    </>
  );
}

export default DoctorDetails;
