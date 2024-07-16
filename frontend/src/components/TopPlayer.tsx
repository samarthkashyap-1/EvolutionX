import React,{useState, useEffect} from 'react'
import trophie from '../assets/trophie.svg'
import { useRecoilState, useRecoilValue } from 'recoil';
import { User, allUser } from '../recoil/atom';
import Lottie from 'lottie-react';
import pokiball from '../assets/pokeball-loader.json';
import { useNavigate } from 'react-router-dom';

  

const TopPlayer = () => {
  const user = useRecoilValue(User);
  const [users, setUsers] = useRecoilState(allUser);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user){
      navigate("/login")
    }

    setLoading(true);
    const sortedUsers = [...users].sort((a, b) => b.trophies - a.trophies);
    setDisplayUsers(sortedUsers.slice(0, 10));
    setLoading(false);
  }, [users]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie animationData={pokiball} className="w-44 h-44" />
      </div>
    );
  }

 
  return (
    <div className=' p-5 gap-3 h-full flex flex-col  w-full sm:p-2 '>
        <h1 className='text-6xl font-outline-2 font-bold text-transparent tracking-wider mr-auto sm:text-4xl sm:text-center sm:mx-auto'>Top Players</h1>


    <div className=' bg-black  bg-opacity-30 rounded-3xl flex flex-col gap-5 p-5 border-2 sm:mt-20 sm:p-2 '>

    {displayUsers.map((user, index) => (
        <div key={index} className='flex flex-row items-center justify-between '>
            <div className='flex flex-row items-center gap-5'>
              <h1 className='text-2xl text-white w-5 font-bold sm:text-base'>{index+1}.</h1>
                
                <h1 className='text-2xl text-white font-bold sm:text-xl'>{user.name}</h1>
            </div>
            <div className='flex flex-row items-center gap-5 '>
                <h1 className='text-2xl font-bold sm:text-xl text-white'>{user.trophies}</h1>
                <img src={trophie} className='h-10 w-10' alt='trophy' />
            </div>
        </div>
    ))}
        
    </div>
   


   

    </div>
  )
}

export default TopPlayer