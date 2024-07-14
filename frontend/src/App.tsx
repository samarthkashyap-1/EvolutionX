import { useState,useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Lottie from "lottie-react";
import pokiball from "./assets/pokeball-loader.json";
import {   Routes, Route } from "react-router-dom";
import PokemonDisplay from "./components/AdoptionCenter";
import MyPokemons from "./components/MyPokemons";
import TopPlayer from "./components/TopPlayer";



function App() {
  const [loading , setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }
    , 2000);
    localStorage.setItem("evolutionx_user", "true");
  }, []);
  if(loading){
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie animationData={pokiball} className='w-44 h-44' />

       
      </div>
    
    )
  }
  return (
    <div className="overflow-hidden bg-black">
    <Navbar />
    <Routes>
      <Route path="/"  element={<LandingPage />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adoptioncenter" element={<PokemonDisplay />} />
        <Route path="/profile/:id" element={<MyPokemons />} />
        <Route path="/topplayer" element={<TopPlayer />} />

      </Route>
      
    </Routes>
    </div>
  );
}

export default App;
