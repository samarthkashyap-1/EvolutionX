import React, { useState, useEffect } from "react";
const data = [
  {
    speciesName: "Pichu",
    type: "Electric",
    ability: "Static",
    image:
      "https://ik.imagekit.io/2vgpdkh7c/pokemon/pichu.png?updatedAt=1720815356298",
    evolveTo: "Pikachu",
    leveltoEvolve: 5,
    baseForm: true,
    price: 35,
    evolvePrice: 50,
  },
  {
    speciesName: "Pikachu",
    type: "Electric",
    ability: "Static",
    image: "https://ik.imagekit.io/2vgpdkh7c/pokemon/pikachu.png",
    evolveTo: "Raichu",
    leveltoEvolve: 10,
    baseForm: false,
    price: null,
    evolvePrice: 40,
  },
  {
    speciesName: "Raichu",
    type: "Electric",
    ability: "Static",
    image: "https://ik.imagekit.io/2vgpdkh7c/pokemon/raichu.png",
    evolveTo: null,
    leveltoEvolve: null,
    baseForm: false,
    price: null,
    evolvePrice: null,
  },
];
import { typeColor } from "../assets/pokemon.js";

const PokemonData = () => {
  const [hp, setHp] = useState(75);
  const [selectedPokemon, setSelectedPokemon] = useState(data[0]);
  const [color, setColor] = useState(typeColor[selectedPokemon.type]);

  useEffect(() => {
    setColor(typeColor[selectedPokemon.type]);
  }, [selectedPokemon]);

  return (
    <div className="grid grid-cols-3 h-[calc(100vh-250px)] gap-5 sm:grid-cols-1 sm:w-full sm:gap-2 sm:flex sm:flex-col ">
      <div
        className="h-full flex items-center justify-center border-2 col-span-1 rounded-2xl relative p-10 sm:p-2 sm:flex-1 "
        style={{
          backgroundColor: color,
        }}
      >
        <img src={selectedPokemon.image} alt="" className="absolute  w-[90%] sm:w-[50%] sm:left-28" />
        <div className="size-72 sm:size-52 bg-white rounded-full"></div>
        <div className="size-10  rounded-full absolute right-2 top-2  border-2 border-white flex justify-center bg-red-600 text-center ">
            <p className="text-2xl text-white font-semibold my-auto">0</p>
        </div>
      </div>
      <div className="h-full border-2 col-span-2 rounded-2xl px-10 py-5 flex flex-col sm:py-2 sm:flex-2 sm:px-3">
        <div className="flex flex-col w-full items-start gap-5  ">
          <div className="flex w-full justify-between sm:flex-col sm:gap-2 ">
            <h1
              className="text-7xl font-bold "
              style={{
                color: color,
              }}
            >
              {selectedPokemon.speciesName}
            </h1>
            <div className="flex gap-2 items-center my-auto ">
              <p className="text-white font-semibold text-lg" >HP</p>
              <p className="text-white  font-semibold">0</p>
              <div className="w-[400px] h-4 bg-gray-400 border-2 rounded-2xl flex overflow-hidden">
                {Array(100)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-full ${
                        index < hp ? "bg-green-500" : ""
                      }`}
                    ></div>
                  ))}
              </div>
              <p className="text-white font-semibold ">100</p>
            </div>
          </div>

          <div className="flex gap-2 justify-center sm:h-20">
            <p
              className="text-center text-lg sm:text-sm sm:px-1 border-2  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out"
              style={{ color: color, borderColor: color }}
            >
              {selectedPokemon?.type}
            </p>
            <p
              className="text-center text-lg sm:text-sm sm:px-1 border-2  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out"
              style={{ color: color, borderColor: color }}
            >
              {selectedPokemon?.ability}
            </p>
          {selectedPokemon.evolveTo ? (
            <div className="flex  gap-2">
              <p  className="text-center text-lg sm:text-sm sm:px-1 border-2  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out"
              style={{ color: color, borderColor: color }}>
                Evolve at Level {selectedPokemon.leveltoEvolve}
              </p>
              <p  className="text-center text-lg sm:text-sm sm:px-1 border-2  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out"
              style={{ color: color, borderColor: color }}>
                New Evolution: {selectedPokemon.evolveTo}
              </p>
            </div>
          ) : (
            <p className="text-center text-lg sm:text-sm sm:px-1 border-2  px-2 py-0.5 my-auto rounded-2xl font-semibold z-10 transition-all duration-200 ease-in-out"
            style={{ color: color, borderColor: color }}>Final Form</p>
          )}

          </div>
          <div className="flex gap-6 sm:mt-auto sm:justify-center w-full">
            <button className="text-3xl sm:text-lg sm:px-10 sm:py-4  border-4  bg-green-500 text-white font-semibold px-16 py-6 rounded-2xl">Feed</button>
            <button className="text-3xl sm:text-lg sm:px-10 sm:py-4  border-4  bg-red-500 text-white font-semibold px-16 py-6 rounded-2xl">Evolve</button>
            
          </div>
        </div>
        <hr className="mt-auto border-2 sm:border"/>
        <div className="flex mt-auto gap-2 sm:justify-center">
          {data.map((pokemon) => (
            <div
              className={`flex items-center bg-white ${selectedPokemon.speciesName === pokemon.speciesName ? "outline" : "" } outline-green-400 outline-offset-4 rounded-full border-2 justify-between overflow-hidden`}
              style={{
                borderColor: color,
              }}
              onClick={() => {
                setSelectedPokemon(pokemon);
              }}
            >
              <img
                src={pokemon.image}
                alt=""
                className="size-28 object-cover sm:size-20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
