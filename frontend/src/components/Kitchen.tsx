import { useEffect, useState } from 'react';
import kitchen from "../assets/kitchen.svg";
import { userMeals } from '../services/api.js';
import { UserData } from "../recoil/atom.js";
import { useRecoilValue } from "recoil";

const Kitchen = () => {
  const userData = useRecoilValue(UserData);
  const [timer, setTimer] = useState(10);
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
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer === 1 ? 10 : prevTimer - 1));
    }, 1000);

    
  
    const fetchMealsInterval = setInterval(() => {
      fetchMeals();
    }, 2000);
  
    return () => {
      clearInterval(timerInterval);
      clearInterval(fetchMealsInterval);
    };
  }, []);
  useEffect(()=>{
    if(meal === 5){
      setTimer(0)
    }
    setTimer(10)
  },[meal])

  return (
    <div className="flex items-center gap-2 sm:gap-0">
      <img src={kitchen} alt="" className="size-10 sm:size-8" />
      <div className="flex flex-col gap-2 w-44 sm:w-24">
        <h1 className="font-semibold text-sm sm:text-xs">
          {meal === 5 ? "Meals are ready " : "Meal ready in"} {meal === 5 ? "00:00" : `00:${timer.toString().padStart(2, "0")}`}
        </h1>
        {meal !== undefined && (
          <div className="flex mx-auto overflow-hidden rounded-2xl w-[120px] sm:w-[60px] h-3 border">
            {Array(meal).fill(0).map((_, index) => (
              <div key={index} className="w-6 h-3 border bg-green-500 sm:w-3"></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kitchen;
