import React,{useState, useEffect} from 'react'
import trophie from '../assets/trophie.svg'
const sampleUsers = [
  
   

    {
      username: "AshKetchum",
      email: "ash@poke.com",
      password: "password123",
      coins: 100,
      trophies: 300,
      pokemons: []
    },
    {
      username: "Misty",
      email: "misty@poke.com",
      password: "password123",
      coins: 200,
      trophies: 5,
      pokemons: []
    },
    {
      username: "Brock",
      email: "brock@poke.com",
      password: "password123",
      coins: 150,
      trophies: 4,
      pokemons: []
    },
    {
      username: "GaryOak",
      email: "gary@poke.com",
      password: "password123",
      coins: 250,
      trophies: 6,
      pokemons: []
    },
    {
      username: "Tracey",
      email: "tracey@poke.com",
      password: "password123",
      coins: 80,
      trophies: 2,
      pokemons: []
    },
    {
      username: "Dawn",
      email: "dawn@poke.com",
      password: "password123",
      coins: 300,
      trophies: 8,
      pokemons: []
    },
    {
      username: "May",
      email: "may@poke.com",
      password: "password123",
      coins: 120,
      trophies: 3,
      pokemons: []
    },
    {
      username: "Max",
      email: "max@poke.com",
      password: "password123",
      coins: 90,
      trophies: 1,
      pokemons: []
    },
    {
      username: "Serena",
      email: "serena@poke.com",
      password: "password123",
      coins: 400,
      trophies: 10,
      pokemons: []
    },
    {
      username: "Clemont",
      email: "clemont@poke.com",
      password: "password123",
      coins: 110,
      trophies: 2,
      pokemons: []
    }
  ];
  

const TopPlayer = () => {

  
  sampleUsers.sort((a, b) => b.trophies - a.trophies);
  
  sampleUsers.splice(10);
    
  return (
    <div className=' p-5 gap-3 h-full flex flex-col  w-full sm:p-2 '>
        <h1 className='text-6xl font-outline-2 font-bold text-transparent tracking-wider mr-auto sm:text-4xl sm:text-center sm:mx-auto'>Top Players</h1>


    <div className=' bg-black  bg-opacity-30 rounded-3xl flex flex-col gap-5 p-5 border-2 sm:mt-20 sm:p-2 '>

    {sampleUsers.map((user, index) => (
      
        <div key={index} className='flex flex-row items-center justify-between '>
            <div className='flex flex-row items-center gap-5'>
              <h1 className='text-2xl text-white w-5 font-bold sm:text-base'>{index+1}.</h1>
                
                <h1 className='text-2xl text-white font-bold sm:text-xl'>{user.username}</h1>
            </div>
            <div className='flex flex-row items-center gap-5 '>
                <h1 className='text-2xl font-bold sm:text-xl text-white'>{user.trophies}</h1>
                <img src={trophie} className='h-10 w-10' alt='trophy' />
            </div>
        </div>
    ))}
        
    </div>
   


   

    </div>
  )
}

export default TopPlayer