import React from "react";
import logo from "../assets/logo.png";
import bg from "../assets/bg2.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex  w-screen">
   
      <div className="flex-1 flex justify-center">
      <div className=" text-white  w-fit px-6 flex flex-col gap-6 tracking-wide border-2 backdrop-blur-md py-8 rounded-2xl">
        <h1 className="text-5xl  font-semibold ">Login To</h1>
        <div className="flex mx-auto gap-4 group">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text  transition-all duration-300 ease-in-out  font-outline-2 ">
            Evolution X
          </h1>
          {/* <Lottie animationData={pokeball} className='w-28 ' /> */}
          <img src={logo} alt="" className="w-16 animate-bounce sm:hidden" />
        </div>
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xl text-start">
              Email :
            </label>
            <input
            required
              type="email"
              name="email"
              id="email"
              placeholder="example@example.com"
              className="px-4 bg-gray-800 py-3 rounded-lg text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xl text-start">
              Password :
            </label>
            <input
            required
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="px-4 bg-gray-800 py-3 rounded-lg text-white"
            />
          </div>
        </form>

        <button
          className="flex w-fit mx-auto justify-center my-auto gap-2 group items-center rounded-full hover:shadow-2xl shadow-white transition-all duration-300 ease-in-out bg-white  px-10 py-2 "
          style={{
            cursor:
              "url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto",
          }}
        >
          <p className="text-black text-lg font-bold group-hover:font-outline-1 tracking-wide  transition-all duration-200 ease-in-out  group-hover:text-transparent ">
            Login
          </p>

          <img
            src={logo}
            alt=""
            className="w-10 group-hover:animate-spin  transition-all duration-200 ease-in-out"
          />
        </button>

        <p className="flex gap-1 mx-auto">
          New User? <Link style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }} to ="/register" className="text-orange-500"> Register</Link>
        </p>
      </div>
      </div>
      <div className="flex-1 flex sm:hidden">
        <img
          src={bg}
          alt=""
          className="w-fit  my-auto  image "
        />
      </div>
    </div>
  );
};

export default Login;
