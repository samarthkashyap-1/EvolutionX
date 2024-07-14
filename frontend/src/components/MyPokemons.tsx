import React from 'react'
import ProfileData from './ProfileData'
import PokemonData from './PokemonData'

const MyPokemons = () => {
  return (
    <div className=' p-5 gap-3 h-full flex flex-col  w-full sm:p-0 '>
        <h1 className='text-6xl font-outline-2 font-bold text-transparent tracking-wider mr-auto sm:text-4xl sm:text-center sm:mx-auto'>My Pokemons</h1>


    <div className=' bg-black  bg-opacity-30 rounded-3xl flex flex-col gap-5 p-5 border-2 sm:p-2 sm:mt-8 '>
        <ProfileData />
        <PokemonData />
    </div>

    {/* <h1 className='text-7xl text-white hidden sm:block'>Under construction</h1> */}
   


   

    </div>
  )
}

export default MyPokemons