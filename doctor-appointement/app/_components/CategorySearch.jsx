"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Search } from 'lucide-react';

import axios from 'axios';
import { getAllCategoriesRoute,  } from '../_utils/GlobalApi';
import Link from 'next/link';

function CategorySearch() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(getAllCategoriesRoute);
        console.log("Response data:", response.data); // Debugging statement
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);


  return (
    <div className='mb-10 px-5 items-center flex flex-col gap-2'>
      <h2 className='font-bold text-4xl tracking-wide'>
        Search <span className='text-primary'>Doctors</span>
      </h2>
      <h2 className='text-gray-500 text-xl'>
        Search Your Doctor and Book appointement in one click
      </h2>

      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className='h-4 w-4 mr-2'/>
          Search
        </Button>
      </div>

      {/* Display categories below */}
      <div className=' grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 mt-5 gap-5 ' >
      {categories.length ===0 ? ( 
                    [1, 2, 3].map((item, index) => (
                      <div key={index} className='h-[100px] w-[100px] bg-slate-200 rounded-lg animate-pulse'>
                          </div>
                  ))
      ) : (
        
        categories.map((category, index) =>(
          <Link href={'/search/'+ category.name} key={index} className='flex flex-col rounded-lg text-center items-center p-5 bg-blue-100 m-2 gap-2 hover:scale-110 transition-all'>
             <img src={category.image} width={40 } height={40}     />
            <label className='text-sm'>{category.name}</label>
          </Link>
                    ))
                  )}
      </div>
    </div>
  );
}

export default CategorySearch;
