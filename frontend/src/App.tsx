import { useState, useEffect, lazy } from "react";
import Lottie from "lottie-react";
import pokiball from "./assets/pokeball-loader.json";
import { Routes, Route } from "react-router-dom";
import { getAllUsers } from "./services/api";
import { useRecoilState } from "recoil";
import { allUser, User, UserData } from "./recoil/atom";
import { Toaster } from "react-hot-toast";
const Notfound = lazy(() => import("./components/Notfound"));
const PokemonDisplay = lazy(() => import("./components/AdoptionCenter"));
const MyPokemons = lazy(() => import("./components/MyPokemons"));
const TopPlayer = lazy(() => import("./components/TopPlayer"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Navbar = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

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
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
