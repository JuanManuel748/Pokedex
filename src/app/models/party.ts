
import { ownedPokemon } from "./ownedPokemon";

export interface party {
    id?: string;
    name: string;
    
    poke_1: string;
    poke_2: string;
    poke_3: string;
    poke_4: string;
    poke_5: string;
    poke_6: string;
    /*
    poke_1: ownedPokemon;
    poke_2: ownedPokemon;
    poke_3: ownedPokemon;
    poke_4: ownedPokemon;
    poke_5: ownedPokemon;
    poke_6: ownedPokemon;
    */
}