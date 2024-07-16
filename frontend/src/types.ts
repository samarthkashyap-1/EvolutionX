// types.ts

export interface PokemonData {
    speciesName: string;
    type: string;
    ability: string;
    image: string;
    evolveTo: string | null;
    leveltoEvolve: number | null;
    baseForm: boolean;
    price: number | null;
    evolvePrice: number | null;
  }
  
  export interface TypeColor {
    [key: string]: string;
  }
  