import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const HomePageHeroSection = () => {
  const handleButtonClick = () => {
    // Implement navigation or other logic here
    console.log('Button clicked');
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-start justify-center space-y-12 px-24 py-12">
        <h1 className="text-6xl font-bold leading-snug text-gray-800">
          Meet the New Landingfolio Kit
        </h1>
        <p className="text-xl text-gray-600">
          Clarity gives you the blocks & components you need to create a truly professional website, landing page or admin panel for your SaaS.
        </p>
        <button 
          className="px-10 py-3 bg-blue-600 text-white text-lg leading-7 rounded-lg"
          onClick={handleButtonClick}
        >
          Start using LandingFolio
        </button>
      </div>
      <div className="flex items-center justify-center w-128 h-128 bg-blue-200 rounded-3xl">
        <FontAwesomeIcon icon={faCamera} className="text-6xl text-white" />
      </div>
    </div>
  );
};

export default HomePageHeroSection;