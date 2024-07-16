
import { typeColor } from "../assets/pokemon.js";

const PokemonCard = ({ pokemon }) => {
  const color = typeColor[pokemon?.type];


  return (
    <div
      className="relative flex flex-col w-fit  border-2 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200 ease-in-out"
      style={{ backgroundColor: color }}
    >
      <div className="relative mx-8 w-36 h-28 sm:w-44 sm:h-24  ">
        <img
          src={pokemon?.image}
          alt={pokemon?.speciesName}
          className="absolute left-0 top-0 w-full h-full object-contain scale-[1.5]  sm:scale-[1.7] z-10  transform -translate-y-8"
          
          
        />
        
      </div>
      <div
        className="flex flex-col gap-2 bg-white py-3 rounded-b-2xl shadow-inner"
        style={{ color: color }}
      >
        <p
          className="text-center text-3xl font-semibold z-10"
          style={{ color: color }}
        >
          {pokemon?.speciesName}
        </p>
        <div className="flex gap-2 justify-center">
          <p
            className="text-center border-2  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out"
            style={{ color: color, borderColor: color }}
          >
            {pokemon?.type}
          </p>
          <p
            className="text-center border-2  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out"
            style={{ color: color, borderColor: color }}
          >
            {pokemon?.ability}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-center text-green-600 border-2 border-green-600  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out hover:bg-green-600 hover:text-white">
           Adopt at {pokemon?.price}
          </p>
          <p className="text-center text-red-600 border-2 border-red-600  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out hover:bg-red-600 hover:text-white">
            View
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
