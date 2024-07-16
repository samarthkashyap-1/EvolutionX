import React, { useState, useEffect, useRef } from 'react';
import ProfileData from './ProfileData';
import PokemonData from './PokemonData';
import { useRecoilState } from 'recoil';
import { User, UserData } from '../recoil/atom';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { getUserById } from '../services/api';
import Lottie from 'lottie-react';
import pokiball from '../assets/pokeball-loader.json';

const MyPokemons = () => {
  const [user, setUser] = useRecoilState(User);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useRecoilState(UserData);

  const navigate = useNavigate();
  const { id } = useParams();

  const hasFetchedUser = useRef(false);

  useEffect(() => {
    if (!user) {
      const storedData = localStorage.getItem('evolutionx');
      if (storedData) {
        const storedUser = JSON.parse(storedData).user;
        setUser(storedUser);
      } else {
        navigate('/login');
      }
    }
  }, [user, navigate, setUser]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const fetchedUser = await getUserById(id);
        if (!fetchedUser) {
          toast.error('User not found');
          navigate('/');
          return;
        }
        if (fetchedUser.pokemons.length === 0) {
          toast.error('User has no pokemons');
          // navigate('/adoptioncenter');
        }

        setUserData(fetchedUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error('Failed to fetch user');
        navigate('/');
      }
    };

    if (!hasFetchedUser.current) {
      fetchUser();
      hasFetchedUser.current = true;
    }
  }, [id, navigate, setUserData]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie animationData={pokiball} className="w-44 h-44" />
      </div>
    );
  }

 

  return (
    <div className='p-5 gap-3 h-full flex flex-col w-full sm:p-0'>
      <h1 className='text-6xl font-outline-2 font-bold text-transparent tracking-wider mr-auto sm:text-4xl sm:text-center sm:mx-auto'>
        My Pokemons
      </h1>

      <div className='bg-black bg-opacity-30 rounded-3xl flex flex-col gap-5 p-5 border-2 sm:p-2 sm:mt-8'>
        {userData && (<>
          <ProfileData />
         </>)}
         {userData &&
          userData.pokemons.length !=0 && ( <PokemonData />)
         }
      </div>
    </div>
  );
};

export default MyPokemons;
