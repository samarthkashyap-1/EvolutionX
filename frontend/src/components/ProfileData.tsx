import React,{useState , useEffect} from "react";
import coin from "../assets/coin.svg";
import kitchen from "../assets/kitchen.svg";
import trophie from "../assets/trophie.svg";

const ProfileData = () => {
    const [timer , setTimer] = useState(5)
    const [meal , setMeal] = useState(1)

   // reverse timer from 1 min to 0 sec 

    useEffect(() => {
         if(meal === 5) return
         const interval = setInterval(() => {
            setTimer((timer) => timer - 1)
              if(timer === 0){
                  setMeal((meal) => meal + 1)
                  setTimer(5)
              }
       }, 1000);
         return () => clearInterval(interval)
    }, [timer, meal])



  return (
    <div className="h-20 bg-orange-400  border-2 border-white  text-white w-full rounded-2xl ">
      <div className="flex justify-between items-center px-8 py-2 h-full w-full sm:px-2">
        <div className="flex items-start flex-col">
          <p className="text-3xl font-semibold sm:text-lg sm:truncate sm:w-24">Samarth Kashyap</p>
          
            
            <div className="flex items-center gap-1">
              <img src={trophie} alt="" className="size-8 sm:size-5" />
              <h1 className=" font-semibold sm:text-sm">1000</h1>
            </div>
          
        </div>

       
        <div className="flex items-center gap-2 sm:gap-0">
          <img src={kitchen} alt="" className="size-10 sm:size-8" />
          <div className="flex flex-col gap-2 w-44 sm:w-24">
          <h1 className=" font-semibold text-sm sm:text-xs">{
            meal ===5 ? "Meals are ready ": "Meal ready in"} {meal === 5 ? "00:00" : `00:${timer.toString().padStart(2, "0")}`}</h1>
          <div className="flex mx-auto " >
            {
                Array(meal).fill(0).map((_,index) => (
                    <div key={index} className="w-6 h-3 border bg-green-500 sm:w-3"></div>

                ))
            }
          </div>
          </div>
        </div>


        <div className="flex items-center gap-1 border-2 rounded-2xl px-2 sm:px-0.5 sm:gap-0 sm:py-1 ">
          <img src={coin} alt="" className="size-10 sm:size-7" />
          <h1 className=" font-semibold sm:text-sm">1000</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
