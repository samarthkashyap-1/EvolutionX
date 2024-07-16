// PokemonDisplay.tsx
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { data } from '../assets/pokemon';
import { PokemonData } from '../types'; // Import the PokemonData type
import PokemonFullCard from './PokemonFullCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { User , UserData } from '../recoil/atom';
import { useNavigate } from 'react-router-dom';
import { adoptPokemon } from '../services/api';
import toast from 'react-hot-toast';

const PokemonDisplay: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(calculateItemsPerPage());
  const user= useRecoilValue(User);
  const [userData, setuserData] = useRecoilState(UserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function calculateItemsPerPage(): number {
    const width = window.innerWidth;
    if (width > 992) return 8;
    if (width > 768) return 6;
    return 2;
  }

  const handleAdopt = async (name: string) => {
    setLoading(true);

    
    try {
      toast.promise(adoptPokemon({ speciesName: name }), {
        loading: 'Adopting...',
        success: 'Adopted successfully',
        error: 'Failed to adopt'
      });
      const adopting = await adoptPokemon({ speciesName: name });
      if (adopting) {
        
        setuserData(prev => ({
          ...userData,
          trophies: prev.trophies + 20,
          pokemons: [...prev.pokemons, adopting]
        }));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const newData = data.filter(pokemon => pokemon.baseForm);
  const currentItems = newData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(newData.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelectPokemon = (pokemon: PokemonData) => {
    setSelectedPokemon(pokemon);
  };

  const handleClosePokemon = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className='w-screen relative flex flex-col items-center h-[100lvh]'>
      <h1 className='text-6xl font-outline-2 font-bold text-transparent tracking-wider mr-auto sm:text-4xl sm:text-center sm:mx-auto'>Adoption Center</h1>
      <div className='grid grid-cols-4 gap-16 justify-start items-start pt-14 sm:grid-cols-1 sm:mt-10 sm:gap-20'>
        {currentItems.map((pokemon) => (
          <div key={pokemon.speciesName} onClick={() => handleSelectPokemon(pokemon)}>
            <PokemonCard key={pokemon.speciesName} pokemon={pokemon} />
          </div>
        ))}
      </div>
      <div className='flex justify-between absolute bottom-2 mt-auto w-full sm:auto-10'>
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-lg text-white ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-700'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-700'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {selectedPokemon && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex items-center justify-center z-50'>
          <PokemonFullCard pokemon={selectedPokemon} close={handleClosePokemon} adoptFunction={handleAdopt} loader={loading} user={user} />
        </div>
      )}
    </div>
  );
};

export default PokemonDisplay;
