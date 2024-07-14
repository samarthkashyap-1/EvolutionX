import React from 'react'
import {typeColor} from '../assets/pokemon.js'

const PokemonFullCard = ({pokemon, close}) => {
    const color = typeColor[pokemon?.type];

    
  return (
    <div className="w-full  h-screen z-50 bg-black bg-opacity-25 flex flex-col items-center justify-center p-8 sm:p-6">
    <div className="bg-black relative bg-opacity-70 h-2/3 px-10 py-5 rounded-lg text-white max-w-3xl w-full flex sm:flex-col"
    style={{
        backgroundColor: color,
        border: `5px solid white`
      }}>
      <div className="w-1/2 h-full px-5 flex sm:w-full"
      >
      <img src={pokemon.image} alt="" className='max-h-full w-full my-auto  image-contain sm:h-64 ' />
       
      </div>
      <div className="w-1/2 border-l-2 flex flex-col gap-2 justify-start items-start  px-10 pt-10 border-white sm:border-t sm:w-full sm:pt-2 sm:pl-0 sm:border-l-0">
        
        <h1 className="text-5xl font-bold">{pokemon.speciesName}</h1>
        <p className="text-lg font-semibold ">Type: {pokemon.type}</p>
        <p className="text-lg font-semibold ">Ability: {pokemon.ability}</p>
        <p className="text-lg font-semibold ">Health Point: 100</p>
        {pokemon.leveltoEvolve&&
        
        <p className="text-lg font-semibold ">Minimum Level to Evolve: {pokemon.leveltoEvolve}</p>
        }
        <p className="text-lg font-semibold ">Next Evolution: {pokemon.evolveTo ? pokemon.evolveTo : "No Evolution"}</p>

      <button className=' px-8 mt-auto py-6 mx-auto ml-10 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 sm:mt-20'>Adopt at {pokemon.price} Coins</button>
      </div>

      <button
        onClick={close}
        
        className="absolute top-4  right-4 text-white bg-orange-400 px-3 py-1 rounded-md hover:bg-orange-500"
      >
        X
      </button>
    </div>
    <div className='flex gap-5 justify-center mt-5'>
        {/* <button className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700'>Buy</button> */}
</div>

  </div>
  )
}

export default PokemonFullCard