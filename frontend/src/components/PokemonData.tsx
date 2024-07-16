import  { useState, useEffect } from "react";
import { disownPokemon, getHealth, feedPokemon, evolvePokemon } from "../services/api.js";
import { typeColor } from "../assets/pokemon.js";
import toast from "react-hot-toast";
import { UserData } from "../recoil/atom.js";
import { useRecoilState } from "recoil";

const PokemonData = () => {
  const [userData, setuserData] = useRecoilState(UserData);
  const [loading, setLoading] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(userData.pokemons[0] || null);
  const [hp, setHp] = useState(selectedPokemon.health || 0);
  const [color, setColor] = useState(typeColor[selectedPokemon.type]);


  useEffect(() => {
    setColor(typeColor[selectedPokemon.type]);
  }, [selectedPokemon]);

  useEffect(() => {
    setHp(selectedPokemon.health);
  }, [selectedPokemon]);

  useEffect(() => {
    if (hp === 0 && selectedPokemon) {
      toast.error(`${selectedPokemon.speciesName} has died due to lack of food`);
      handleDisown(); // Automatically disown the Pokémon when HP reaches 0
    }
  }, [hp]);

  useEffect(() => {
    if (selectedPokemon === null) return;
    const fetchHealth = async () => {
      try {
        const health = await getHealth(selectedPokemon.id);
        setHp(health.health);
      } catch (error) {
        console.error("Failed to fetch health:", error);
      }
    };

    const intervalId = setInterval(fetchHealth, 2 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [selectedPokemon]);

  const handleFeed = async () => {
    setLoading(true)
    try {
      toast.promise(feedPokemon({ pokemonId: selectedPokemon.id }), {
        loading: "Feeding...",
        success: "Feed successful",
        error: "Failed to feed",
      });
      const FeedData = await feedPokemon({ pokemonId: selectedPokemon.id });
      if (FeedData) {
        setuserData(prevUserData => ({
          ...prevUserData,
          meals: prevUserData.meals - 1,
          trophies: prevUserData.trophies + 1,
          totalMealCount: prevUserData.totalMealCount + 1,
        }));
        setHp(prev => prev + 10);
        // toast.success("Feed successful");
      }
    setLoading(false)

    } catch (error) {
      console.log(error);
    setLoading(false)

    }
  };

  const handleEvolve = async () => {
    setLoading(false)

    try {
      toast.promise(evolvePokemon({ pokemonId: selectedPokemon.id }), {
        loading: "Evolving...",
        success: "Evolving Successful",
        error: "Failed to evolve",
      });
      const evolving = await evolvePokemon({ pokemonId: selectedPokemon.id });
      if (evolving) {
        // toast.success("Evolving Successful");
        setSelectedPokemon(evolving);
        setuserData(prevUserData => {
          const updatedPokemons = prevUserData.pokemons.map(pokemon =>
            pokemon.id === selectedPokemon.id ? evolving : pokemon
          );
          return {
            ...prevUserData,
            pokemons: updatedPokemons,
          };
        });
      }
      
    setLoading(false)

    } catch (error) {
      console.error(error);
    }
  };

  const handleDisown = async () => {
    setLoading(true)

    try {
      toast.promise(disownPokemon(selectedPokemon.id), {
        loading: "Removing...",
        success: "Pokemon Removed",
        error: "Failed to remove",
      });
      const disowned = await disownPokemon(selectedPokemon.id);
      if (disowned) {
        toast.success("Pokemon Removed");
        setuserData(prevUserData => {
          const updatedPokemons = prevUserData.pokemons.filter(
            pokemon => pokemon.id !== selectedPokemon.id
          );
          return {
            ...prevUserData,
            pokemons: updatedPokemons,
          };
        });
        setSelectedPokemon(userData.pokemons[0] ? userData.pokemons[0] : null);
        
      }
    setLoading(false)
      
    } catch (error) {
      console.error(error);
    }
  };

  const hpPercentage = (hp / 100) * 100;

  return (
    <div className="grid grid-cols-3 h-[calc(100vh-250px)] gap-5 sm:grid-cols-1 sm:w-full sm:gap-2 sm:flex sm:flex-col ">
      <div
        className="h-full flex items-center justify-center border-2 col-span-1 rounded-2xl relative p-10 sm:p-2 sm:flex-1 "
        style={{ backgroundColor: color }}
      >
        <img src={selectedPokemon.image} alt="" className="absolute w-[90%] sm:w-[50%] sm:left-28" />
        <div className="size-72 sm:size-52 bg-white rounded-full"></div>
        <div className="size-10 rounded-full absolute right-2 top-2 border-2 border-white flex justify-center bg-red-600 text-center">
          <p className="text-2xl text-white font-semibold my-auto">{selectedPokemon.level}</p>
        </div>
      </div>
      <div className="h-full border-2 col-span-2 rounded-2xl px-10 py-5 flex flex-col sm:py-2 sm:flex-2 sm:px-3">
        <div className="flex flex-col w-full items-start gap-5 ">
          <div className="flex w-full justify-between sm:flex-col sm:gap-2 ">
            <h1 className="text-5xl font-bold" style={{ color: color }}>
              {selectedPokemon.speciesName}
            </h1>
            <div className="flex gap-2 items-center my-auto ">
              <p className="text-white font-semibold text-lg">HP</p>
              <p className="text-white font-semibold">0</p>
              <div className="w-[400px] h-4 bg-gray-400 border-2 rounded-2xl flex overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${hpPercentage}%` }}
                ></div>
              </div>
              <p className="text-white font-semibold">100</p>
            </div>
          </div>
          <div className="flex gap-2 justify-center sm:h-20">
            <p className="text-center text-lg sm:text-sm sm:px-1 border-2 px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out" style={{ color: color, borderColor: color }}>
              {selectedPokemon?.type}
            </p>
            <p className="text-center text-lg sm:text-sm sm:px-1 border-2 px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out" style={{ color: color, borderColor: color }}>
              {selectedPokemon?.ability}
            </p>
            {selectedPokemon.evolveTo ? (
              <div className="flex gap-2">
                <p className="text-center text-lg sm:text-sm sm:px-1 border-2 px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out" style={{ color: color, borderColor: color }}>
                  Evolve at Level {selectedPokemon.leveltoEvolve}
                </p>
                <p className="text-center text-lg sm:text-sm sm:px-1 border-2 px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out" style={{ color: color, borderColor: color }}>
                  New Evolution: {selectedPokemon.evolveTo}
                </p>
              </div>
            ) : (
              <p className="text-center text-lg sm:text-sm sm:px-1 border-2 px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out" style={{ color: color, borderColor: color }}>
                Final Form
              </p>
            )}
          </div>
          <div className="flex gap-6 sm:mt-auto sm:justify-center w-full sm:gap-2">
            <button
              className={`text-3xl sm:text-lg sm:px-6 sm:py-3 border-4 ${userData.meals > 0 ? "bg-green-500" : "bg-red-500"} text-white font-semibold px-16 py-6 rounded-2xl`}
              onClick={handleFeed}
              disabled={loading}
            >
              Feed
            </button>
            <button
              disabled={loading}

              className="text-3xl sm:text-lg sm:px-6 sm:py-3 border-4 bg-black text-white font-semibold px-16 py-6 rounded-2xl"
              onClick={handleDisown}
            >
              Disown
            </button>
            {selectedPokemon.evolveTo && (
              <button
                className={`text-3xl sm:text-lg sm:px-6 sm:py-3 border-4 ${selectedPokemon.leveltoEvolve <= selectedPokemon.level ? "bg-blue-500" : "bg-gray-400"} text-white font-semibold px-16 py-6 rounded-2xl`}
                disabled={selectedPokemon.leveltoEvolve > selectedPokemon.level || loading}
                
                onClick={handleEvolve}
              >
                Evolve
              </button>
            )}
          </div>
        </div>
        <hr className="mt-auto border-2 sm:border" />
        <div className="flex mt-auto gap-2 sm:justify-center sm:overflow-x-auto sm:flex-nowrap">
          {userData.pokemons.map((pokemon) => (
            <div
              key={pokemon.speciesName}
              className={`flex items-center bg-white ${selectedPokemon.speciesName === pokemon.speciesName ? "outline" : ""} outline-green-400 outline-offset-4 rounded-full border-2 justify-between overflow-hidden`}
              style={{ borderColor: color }}
              onClick={() => {
                setSelectedPokemon(pokemon);
              }}
            >
              <img src={pokemon.image} alt="" className="size-28 object-cover sm:size-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
