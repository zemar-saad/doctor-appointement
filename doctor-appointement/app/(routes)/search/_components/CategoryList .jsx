"use client"
import React, {useEffect,useState} from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,

  } from "@/components/ui/command"
import Link from 'next/link';
import { getAllCategoriesRoute } from '@/app/_utils/GlobalApi';
import axios from 'axios';
import { usePathname } from 'next/navigation';


function CategoryList () {
    const [categories, setCategories] = useState([]);
    const params = usePathname()
    const selected= params.split('/')[2]

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
    console.log(params)
  }, []);
  return (
    <div className='h-screen  mt-5 flex flex-col'>
        <Command>
    <CommandInput placeholder="Search..." />
    <CommandList className="overflow-visible">
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions" >
        {categories.map((category , index)=>(
          <CommandItem key={index}>
            <Link href={'/search/'+category.name}
              className={`p-2 flex gap-2 text-[15px] text-blue-600
                         rounded-md cursor-pointer w-full items-center
                         ${selected==category.name && 'bg-blue-100'}`}
                         >
                <img src={category.image}
                 alt='icon'
                 width={25}
                 height={25}/>

                    <label>{category.name}</label>
            </Link>
          </CommandItem>
        ))}
        

      </CommandGroup>
      
      
    </CommandList>
        </Command>
   </div>
  )
}

export default CategoryList 