import React,{useEffect, useState} from "react";
import logo from "../assets/logo.png";
import bg from "../assets/bg2.png";
import { Link } from "react-router-dom";
import {loginUser} from '../services/api'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { User } from "../recoil/atom";
import { useRecoilState } from "recoil";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(User);

  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user])




  const handleRegister = async () => {
    
   if (!password || !email) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser({ email, password});
      if(user){
        toast.success('Login successfully');
        setEmail('');
        setPassword('');
        // console.log(user.user);
        localStorage.setItem('evolutionx', JSON.stringify(user));
        setUser(user.user);
        navigate('/');
      }
   
      
    } catch (error) {
      toast.error('Failed to Login user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex  w-screen">
   
      <div className="flex-1 flex justify-center">
      <div className=" text-white  w-fit px-6 flex flex-col gap-6 tracking-wide border-2 backdrop-blur-md py-8 rounded-2xl">
        <h1 className="text-5xl  font-semibold ">Login To</h1>
        <div className="flex mx-auto gap-4 group">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text  transition-all duration-300 ease-in-out  font-outline-2 ">
            Evolution X
          </h1>
      
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleRegister}
          disabled={loading}
        >
          <p className="text-black text-lg font-bold group-hover:font-outline-1 tracking-wide  transition-all duration-200 ease-in-out  group-hover:text-transparent ">
            Login
          </p>

          <img
            src={logo}
            alt=""
            className={`w-10  transition-all duration-200 ease-in-out ${loading ? 'animate-spin' : ''}`}
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
