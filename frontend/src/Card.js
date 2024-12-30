import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, color, navigateTo, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if(navigateTo) navigate(navigateTo);
    onClick?.();
  };

  const colorClasses = {
    blue: "text-blue-700 bg-blue-100",
    indigo: "text-indigo-700 bg-indigo-100",
    purple: "text-purple-700 bg-purple-100",
    // Add more color options as needed
  };

  return (
    <div
      className={`cursor-pointer flex justify-between items-center p-6 rounded-lg shadow-md ${colorClasses[color]} hover:shadow-lg transition duration-300`}
      onClick={handleCardClick}
    >
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p>{description}</p>
      </div>
      {/* Optionally add an icon or image here */}
    </div>
  );
};

export default Card;
