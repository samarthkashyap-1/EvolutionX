
import coin from "../assets/coin.svg";
import trophie from "../assets/trophie.svg";
import Kitchen from "./Kitchen";
import { UserData } from "../recoil/atom";
import { useRecoilValue } from "recoil";

const ProfileData = () => {
    
  const data = useRecoilValue(UserData)

   // reverse timer from 1 min to 0 sec 





  return (
    <div className="h-20 bg-orange-400  border-2 border-white  text-white w-full rounded-2xl ">
      <div className="flex justify-between items-center px-8 py-2 h-full w-full sm:px-2">
        <div className="flex items-start flex-col">
          <p className="text-3xl font-semibold sm:text-lg sm:truncate sm:w-24">{data.name}</p>
          
            
            <div className="flex items-center gap-1">
              <img src={trophie} alt="" className="size-8 sm:size-5" />
              <h1 className=" font-semibold sm:text-sm">{data.trophies}</h1>
            </div>
          
        </div>

       <Kitchen />
        


        <div className="flex items-center gap-1 border-2 rounded-2xl px-2 sm:px-0.5 sm:gap-0 sm:py-1 ">
          <img src={coin} alt="" className="size-10 sm:size-7" />
          <h1 className=" font-semibold sm:text-sm">{data.coins}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
