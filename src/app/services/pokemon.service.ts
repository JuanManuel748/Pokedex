import { Injectable } from '@angular/core';
import { pokemon } from '../models/ownedPokemon';
import { Result } from '../models/pokeapi';
import { Ability2, examplePokemon, Item, Move2, Pokemon } from '../models/pokemon';

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

  async getPokemonMoves(id: string | number | undefined): Promise<Move2[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const moves: Move2[] = data.moves.map((move: any) => ({
      name: move.move.name,
      url: move.move.url
    }));
    return moves;
  }

  async getPokemonAbilities(id: string | number): Promise<Ability2[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const abilities: Ability2[] = data.abilities.map((ability: any) => ({
      name: ability.ability.name,
      url: ability.ability.url
    }));
    return abilities;
  }

  async getItems(): Promise<Item[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/item?limit=179&offset=125`);
    const data = await response.json();
    const items: Item[] = data.results.map((item: any) => ({
      name: item.name,
      url: item.url
    }));
    return items;
  }

  async getPokemonFull(id: string | number): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    const moves: Move2[] = data.moves.map((move: any) => ({
      name: move.move.name,
      url: move.move.url
    }));

    const abilities: Ability2[] = data.abilities.map((ability: any) => ({
      name: ability.ability.name,
      url: ability.ability.url
    }));

    const fullPokemon: Pokemon = {
      id: data.id,
      name: data.name,
      base_experience: data.base_experience,
      height: data.height,
      is_default: data.is_default,
      order: data.order,
      weight: data.weight,
      location_area_encounters: data.location_area_encounters,
      sprites: data.sprites,
      types: data.types,
      species: data.species,
    };

    console.log(fullPokemon);

    return fullPokemon;
  }
}