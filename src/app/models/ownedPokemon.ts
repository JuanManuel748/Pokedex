import { Species, Sprites,Type } from "../models/pokemon";

export interface pokemon {
    id?: string;
    name: string;
    description: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    location_area_encounters: string;
    sprites: Sprites;
    types: Type[];
    species: Species;
}


export interface ownedPokemon {
    id?: number;
    idPk: string;
    name: string;
    abilitie: string;
    move_1: string;
    move_2: string;
    move_3: string;
    move_4: string;
    item: string;
}

export const exampleOwnedPokemon: ownedPokemon = {
    id: 25,
    idPk: "25",
    name: 'Pikachu',
    abilitie: 'Static',
    move_1: 'Thunderbolt',
    move_2: 'Quick Attack',
    move_3: 'Iron Tail',
    move_4: 'Electro Ball',
    item: 'Light Ball'
  };

