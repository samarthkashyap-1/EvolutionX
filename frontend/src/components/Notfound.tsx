
import image from '../assets/404.png'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div className='flex flex-col gap-10'>
        <img src={image} alt="404" className='w-2/3  m-auto sm:w-full'/>
        <Link to='/' style={{ cursor: 'url(https://cur.cursors-4u.net/games/gam-13/gam1309.png), auto' }} className='text-center text-white text-2xl border-white border w-fit mx-auto px-4 py-2 rounded-2xl bg-orange-500 hover:text-orange-500 hover:bg-white transition-all duration-200 ease-in-out'>Go back to Home</Link>
    </div>
  )
}

export default Notfound