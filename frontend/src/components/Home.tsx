
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { User } from '../recoil/atom';

import logo from "../assets/logo.png";


const Home = () => {
  const user = useRecoilValue(User);
  return (
    <div className="text-white px-6 flex flex-col gap-6 tracking-wide sm:px-0">
    <h1 className="text-6xl font-semibold sm:text-5xl ">Welcome to Pokémon</h1>
    <div className="flex mx-auto gap-5 group">
      <h1 className="text-8xl  font-bold text-transparent bg-clip-text  transition-all duration-300 ease-in-out  font-outline-2 sm:text-7xl ">
        Evolution X
      </h1>
      {/* <Lottie animationData={pokeball} className='w-28 ' /> */}
      <img src={logo} alt="" className="w-24 animate-bounce sm:hidden" />
    </div>
    <p className="text-2xl ">
      Adopt, train, and evolve Pokémon in a high-tech world. Feed them and
      climb the global rankings!
    </p>

    <Link to={`${user ? `/profile/${user.id}`:"/login"}`} className="flex w-fit mx-auto justify-center my-auto mt-10 gap-2 group items-center rounded-full hover:shadow-2xl shadow-white transition-all duration-300 ease-in-out bg-white  px-10 py-2 "
    style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }}>
      <p className="text-black text-lg font-bold group-hover:font-outline-1 tracking-wide  transition-all duration-200 ease-in-out  group-hover:text-transparent ">
        Begin your journey
      </p>

      <img
        src={logo}
        alt=""
        className="w-10 group-hover:animate-spin  transition-all duration-200 ease-in-out"
      />
    </Link>
  </div>
  )
}

export default Home