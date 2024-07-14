import React from "react";
import background from "../assets/bg.jpg";
import { Outlet } from "react-router-dom";

const LandingPage = () => { 
  
  return (
    <div
      className="min-h-screen flex  items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-screen h-screen absolute right-0 left-0 bg-black bg-opacity-40 backdrop-blur-sm px-20 flex justify-center items-center text-center sm:px-4"><Outlet />
       
      </div>
    </div>
  );
};

export default LandingPage;
