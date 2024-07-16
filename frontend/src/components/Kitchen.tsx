import { useEffect, useState } from 'react';
import kitchen from "../assets/kitchen.svg";
import { userMeals } from '../services/api.js';
import { UserData } from "../recoil/atom.js";
import { useRecoilValue } from "recoil";

const Kitchen = () => {
  const userData = useRecoilValue(UserData);
  // const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [meal, setMeal] = useState(userData.meals);

  const fetchMeals = async () => {
    try {
      const currentMeals = await userMeals(userData.id);
      setMeal(currentMeals.meals);
    } catch (error) {
      console.error('Failed to fetch meal count:', error);
    }
  };

  useEffect(() => {
    
  

    
    const fetchMealsInterval = setInterval(() => {
      fetchMeals();
    }, 300000); 
    return () => {
      clearInterval(fetchMealsInterval);
    };
  }, []);



  // When meals reach 5, reset timer
  useEffect(() => {
    setMeal(userData.meals);
  }, [ userData.meals]);

  return (
    <div className="flex items-center gap-2 sm:gap-0">
      <img src={kitchen} alt="" className="size-10 sm:hidden" />
      <div className="flex flex-col gap-1 w-44 sm:w-24 sm:gap-0.5">
        <h1 className="font-semibold text-xs ">
          Meals ready: {meal}
          {/* {meal === 5 ? "Meals are ready" : "Meal ready in"} {meal === 5 ? "00:00" : `0${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`} */}
        </h1>
        {meal !== undefined && (
         <>
          <div className="flex mx-auto overflow-hidden rounded-2xl w-[120px] sm:w-[5rem] h-3  sm:h-2 border">
            {Array(meal).fill(0).map((_, index) => (
              <div key={index} className="w-6 h-3 border bg-green-500 sm:w-4 "></div>
            ))}
          </div>
          <p className='text-[10px] sm:text-[8px] '>prep time: 10 min each</p></>
        )}
      </div>
    </div>
  );
};

export default Kitchen;
