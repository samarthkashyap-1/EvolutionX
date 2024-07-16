import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'https://f2v33x33-3000.inc1.devtunnels.ms';
// const BASE_URL = import.meta.env.VITE_REACT_APP_URL;
// console.log(BASE_URL);




export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in each request
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("evolutionx")
            ? JSON.parse(localStorage.getItem("evolutionx")).token
            : null;
            // console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getAllUsers = async () => {
    try {
        const response = await api.get('/user/all');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const  getUserById = async (id) => {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const registerUser = async (user) => {
    try {
        const response = await api.post('/user/register', user);
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
    }
};

const loginUser = async (user) => {
    try {
        const response = await api.post('/user/login', user);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);

        console.error(error);
    }
};

const userMeals = async (id) => {
    try {
        const response = await api.get(`/user/${id}/meals`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Pokemons

const adoptPokemon = async (pokemon) =>{
    try {
        const response = await api.post('/pokemon/create',pokemon);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);

        console.error(error);
    }
}

const getAllPokemons = async () => {
    try {
        const response = await api.get('/pokemon/all');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);

        console.error(error);
    }
}

const getPokemon = async () => {
    try {
        const response = await api.get('/pokemon');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);

        console.error(error);
    }
}

const feedPokemon = async (pokemon) => {
    try {
        const response = await api.put(`/pokemon/feed`, pokemon);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);

        console.error(error);
    }
}

const evolvePokemon = async (pokemon) => {
    try {
        const response = await api.put(`/pokemon/evolve`, pokemon);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);

        console.error(error);
    }
}

const disownPokemon = async (pokemon) => {
    try {
        const response = await api.delete(`/pokemon/disown/${pokemon}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);

        console.error(error);
    }
}

const getHealth = async (pokemonId) => {
    try {
        const response = await api.get(`/pokemon/${pokemonId}/health`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);

        console.error(error);
    }
}

export {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser,
    userMeals,
    adoptPokemon,
    getAllPokemons,
    getPokemon,
    feedPokemon,
    evolvePokemon,
    disownPokemon,
    getHealth
};

