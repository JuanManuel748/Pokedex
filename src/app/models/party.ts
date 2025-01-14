
import { ownedPokemon } from "./ownedPokemon";

export interface party {
    id?: string;
    name: string;
    
    poke_1: ownedPokemon;
    poke_2: ownedPokemon;
    poke_3: ownedPokemon;
    poke_4: ownedPokemon;
    poke_5: ownedPokemon;
    poke_6: ownedPokemon;
    
}