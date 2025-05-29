import React from 'react'
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-gray-400 h-16 flex justify-between px-4 items-center'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <ul className='flex gap-2 items-center'>
            <li><button className='px-3 py-2 text-sm font-semibold bg-gray-500 hover:shadow-md hover:bg-gray-600 rounded-md duration-150 cursor-pointer' onClick={() => navigate("/addAgent")}>Add Agent</button></li>
            <li><button className='px-3 py-2 text-sm font-semibold bg-gray-500 hover:shadow-md hover:bg-gray-600 rounded-md duration-150 cursor-pointer '>Upload file</button></li>
            <li><button className=' flex items-center px-3 py-2 text-sm font-semibold bg-gray-500 hover:shadow-md hover:bg-gray-600 rounded-md duration-150 cursor-pointer'> <LogOut className='w-4 h-4 mr-2' /> Logout</button></li>
        </ul>
    </div>
  )
}

export default Navbar