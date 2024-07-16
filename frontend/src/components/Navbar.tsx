import  { useState } from "react";
import logo from "../assets/logo.png";
import pokeball from "../assets/pokeball.svg";
import { Link } from "react-router-dom";
import { useRecoilState  } from "recoil";
import {User } from "../recoil/atom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useRecoilState(User);



  return (
    <div className="relative ">
      <div className=" absolute   px-20 flex justify-between z-40 top-2 left-0 w-screen h-full bg-black bg-opacity-50 sm:px-1">
      
        {
          isOpen ? (
            <div className="flex justify-center my-auto gap-2 mt-1">
          <h1 className="my-auto text-3xl text-transparent tracking-wide font-bold font-outline-1 invert">
            Evolution X
          </h1>
          <img src={logo} alt="" className="w-12 h-12" />
        </div>) : null
        }
        
        <div className="ml-auto">
          <img
            src={pokeball}
            alt=""
            className={`invert size-16  ${
              isOpen ? "-rotate-180" : " rotate-0"
            } transition-all duration-300 ease-in-out`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>
      </div>

      <div
        className={`    absolute z-30 top-0 right-0 h-screen flex justify-center mx-auto  items-center bg-gray-700 transition-all duration-300 ease-in-out ${
          isOpen ? "w-screen" : "w-0 "
        }`}
      >
        <ul
          
          className={`flex flex-col gap-10 ml-20 w-1/2 sm:w-full sm:ml-0`}
        >
          <Link to="/" style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }} className="text-white text-6xl sm:text-5xl font-semibold flex gap-5 w-fit  hover:font-outline-2 group hover:text-transparent transition-all duration-200 ease-in-out "
          onClick={() => {
            setIsOpen(false);
          }}>
            <img
              src={logo}
              alt=""
              className="group-hover:w-10 h-10 my-auto w-0  transition-all duration-200 ease-in-out "
            />{" "}
            Home
          </Link>
          {user && (
            <Link to={`/profile/${user.id}`} className="text-white text-6xl sm:text-5xl font-semibold flex gap-5 group w-fit   hover:font-outline-2 hover:text-transparent transition-all duration-200 ease-in-out"
            style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }}
            onClick={() => {
              setIsOpen(false);
            }}>
            <img
              src={logo}
              alt=""
              className="group-hover:w-10 h-10 my-auto w-0  transition-all duration-200 ease-in-out "
            />
            My Pokemons
          </Link>
          )}
          {user && (
            <>
            <Link to="/adoptioncenter" className="text-white text-6xl sm:text-5xl font-semibold flex gap-5 group w-fit   hover:font-outline-2 hover:text-transparent transition-all duration-200 ease-in-out"
            style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }}
            onClick={() => {
              setIsOpen(false);
            }}>
            <img
              src={logo}
              alt=""
              className="group-hover:w-10 h-10 my-auto w-0  transition-all duration-200 ease-in-out "
            />
            Adoption Center
          </Link>
          <Link to="/topplayer" className="text-white text-6xl sm:text-5xl font-semibold flex gap-5 group w-fit   hover:font-outline-2 hover:text-transparent transition-all duration-200 ease-in-out"
          style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }}
          onClick={() => {
            setIsOpen(false);
          }}>
            <img
              src={logo}
              alt=""
              className="group-hover:w-10 h-10 my-auto w-0  transition-all duration-200 ease-in-out "
            />
            Top Players
          </Link></>
          )}

          {user ?(
            <li className="text-white text-6xl sm:text-5xl font-semibold flex gap-5 group w-fit   hover:font-outline-2 hover:text-transparent transition-all duration-200 ease-in-out" 
            onClick={() => {
              localStorage.removeItem("evolutionx");
              setUser(null);
              setIsOpen(false);
            }}>
            <img
              src={logo}
              alt=""
              className="group-hover:w-10 h-10 my-auto w-0  transition-all duration-200 ease-in-out "
            />
            Logout
          </li>
          ):
          <Link to="/login" className="text-white text-6xl sm:text-5xl font-semibold flex gap-5 group w-fit  hover:font-outline-2 hover:text-transparent transition-all duration-200 ease-in-out"
          style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }} 
          onClick={() => {
            setIsOpen(false);
          }}>
            <img
              src={logo}
              alt=""
              className="group-hover:w-10 h-10 my-auto w-0  transition-all duration-200 ease-in-out "
            />
            Login / Register
          </Link>}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
