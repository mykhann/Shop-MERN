import Navbar from '@components/shared/Navbar';
import React from 'react';
import { useSelector } from 'react-redux';
import { PencilIcon } from '@heroicons/react/24/outline'; // Importing the Pencil icon
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {
  const { user } = useSelector(store => store.auth);
  const navigate=useNavigate()
  
  return (
    <>
      <div className="flex">
        <Navbar />
      </div>
      <div className="bg-white mt-32 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 max-w-3xl mx-auto relative">
        {/* Edit Icon */}
        <div className="absolute top-2 right-2">
          <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
            <PencilIcon onClick={()=>navigate("/profile/edit")} className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <img
            src={user?.avatar} // Replace with actual image URL
            alt="Profile Avatar"
            className="w-full sm:w-36 md:w-40 lg:w-48 h-24 sm:h-auto object-cover rounded-full sm:rounded-none"
          />
          <div className="p-4 mt-4 ml-20 sm:pl-8">
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl">
              {user?.name}
            </h3>
            <p className="mt-1 text-gray-600 text-sm sm:text-base md:text-lg">
              {user?.address}
            </p>
            <p className="mt-1 text-blue-600 text-sm sm:text-base md:text-lg">
              {user?.email}
            </p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
