import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Lottie from "lottie-react";
import pokiball from "./assets/pokeball-loader.json";
import { Routes, Route } from "react-router-dom";
import PokemonDisplay from "./components/AdoptionCenter";
import MyPokemons from "./components/MyPokemons";
import TopPlayer from "./components/TopPlayer";
import { getAllUsers } from "./services/api";
import { useRecoilState } from "recoil";
import { allUser, User, UserData } from "./recoil/atom";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(false);
  const [_user, setUser] = useRecoilState(User);
  const [userData, _setUserData] = useRecoilState(UserData);

  const [_allUsers, setAllUsers] = useRecoilState(allUser);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const fetchAllUsers = async () => {
      try {
        const users = await getAllUsers();
        setAllUsers(users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();

    if (localStorage.getItem("evolutionx")) {
      const user = JSON.parse(localStorage.getItem("evolutionx")).user;
      setUser(user);
    }
  }, [userData]);
  // console.log(allUsers);
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie animationData={pokiball} className="w-44 h-44" />
      </div>
    );
  }
  return (
    <div className="overflow-hidden bg-black">
      <Toaster />

      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />}>
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
