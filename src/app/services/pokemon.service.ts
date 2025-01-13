import { Injectable } from '@angular/core';
import { pokemon } from '../models/ownedPokemon';
import { Result } from '../models/pokeapi';

@Injectable({
  providedIn: 'root'
})  
export class PokemonService {

  async getByPage(page: number, size: number = 100): Promise<Result[]> {
    if (page > 5) return [];
    const offset = size * (page - 1);
    const resultFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`);
    const data = await resultFetch.json();
    if (data.results.length > 0) return data.results;
    return [];
  }

  async getById(id: string): Promise<pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();

    const ty = await fetch(pokemon.types[0].type.url);
    const type = await ty.json();

    const esp = await fetch(pokemon.species.url);
    const species = await esp.json();

    const ata1 = await fetch(pokemon.moves[0].move.url);
    const attack1 = await ata1.json();

    const ata2 = await fetch(pokemon.moves[1].move.url);
    const attack2 = await ata2.json();

    pokemon.adicionales = {
      type,
      species,
      attack1,
      attack2
    };

    return pokemon as pokemon;
    //return await response.json as pokemon;

  }

  async getDescription(id: string | number): Promise<string> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto: any) => texto.language.name === "es");
    return texto ? texto.flavor_text : "No se encontró descripción en español";
  }

}