import { Injectable } from '@angular/core';
import { Result } from '../models/pokeapi';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  async getMoves(page: number, size: number = 10): Promise<Result[]> {
    if (page > 5) return Promise.resolve([]);
    const offset = size * (page - 1);
    const resultFetch = await fetch(
      `https://pokeapi.co/api/v2/move/?limit=${size}&offset=${offset}`
    );
    const data = await resultFetch.json();
    if (data.results.length > 0) return data.results;
    return [];
  }

  async getMoveById(id: string): Promise<Result> {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`);
    return await response.json();
  }

  async getMoveByName(name: string): Promise<Result> {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
    return await response.json();
  }

  async getItems(page: number, size: number = 10): Promise<Result[]> {
    const offset = size * (page - 1);
    const resultFetch = await fetch(
      `https://pokeapi.co/api/v2/item/?limit=${size}&offset=${offset}`
    );
    const data = await resultFetch.json();
    if (data.results.length > 0) return data.results;
    return [];
  }

  async getItemById(id: string): Promise<Result> {
    const response = await fetch(`https://pokeapi.co/api/v2/item/${id}`);
    return await response.json();
  }

  async getItemByName(name: string): Promise<Result> {
    const response = await fetch(`https://pokeapi.co/api/v2/item/${name}`);
    return await response.json();
  }
}