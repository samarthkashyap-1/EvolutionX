import {useState} from 'react'
import logo from "../assets/logo.png";
import bg from "../assets/bg3.png";
import { Link , useNavigate } from "react-router-dom";
import {registerUser} from '../services/api'
import toast from 'react-hot-toast';
import { User } from "../recoil/atom";
import { useRecoilState } from 'recoil';



const Register = () => {
    const [loading, setLoading] = useState(false);
    const [_user, setUser] = useRecoilState(User);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    


  const handleRegister = async () => {
    
    if(password !== confirmPassword){
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const user = await registerUser({name, email, password, confirmPassword});
      if(user){
        toast.success(' Registered successfully');
        localStorage.setItem('evolutionx', JSON.stringify(user));
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUser(user.user);
        navigate('/');
      }
      
      
    } catch (error) {
      toast.error('Failed to register');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
     
        
    
    return (
        <div className="flex  w-screen">
            <div className="flex-1 sm:hidden">
            <img
              src={bg}
              alt=""
              className="w-fit h-full object-contain  image"
            />
          </div>
         
          <div className="flex-1 flex justify-center">
          <div className=" text-white  w-fit px-6 flex flex-col gap-5 tracking-wide border-2 backdrop-blur-md py-4 rounded-2xl">
            <h1 className="text-5xl  font-semibold ">Register To</h1>
            <div className="flex mx-auto gap-4 group">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text  transition-all duration-300 ease-in-out  font-outline-2 ">
                Evolution X
              </h1>
              
              <img src={logo} alt="" className="w-16 animate-bounce sm:hidden" />
            </div>
            <form action="" className="flex flex-col gap-3" >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xl text-start">
                  Name :
                </label>
                <input
                required
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="example@example.com"
                  className="px-4 bg-gray-800 py-3 rounded-lg text-white"
                />
              </div>
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
                  placeholder="Create Password"
                  className="px-4 bg-gray-800 py-3 rounded-lg text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPass" className="text-xl text-start">
                  Confirm Password :
                </label>
                <input
                required
                  type="password"
                  name="confirmPass"
                  id="confirmPass"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-Enter Password"
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
              disabled={loading}
              onClick={handleRegister}
            >
              <p className="text-black text-lg font-bold group-hover:font-outline-1 tracking-wide  transition-all duration-200 ease-in-out  group-hover:text-transparent ">
                Register
              </p>
    
              <img
                src={logo}
                alt=""
                className={`w-10  transition-all duration-200 ease-in-out ${loading ? 'animate-spin' : ''}`}
              />
            </button>
    
            <p className="flex gap-1 mx-auto">
              Already registered? <Link style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }} to="/login" className="text-orange-500"> Login</Link>
            </p>
          </div>
          </div>
          
        </div>
      );
}

export default Register