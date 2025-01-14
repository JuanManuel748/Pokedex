import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, docData, deleteDoc, CollectionReference, DocumentReference, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ownedPokemon } from '../models/ownedPokemon';

@Injectable({
  providedIn: 'root',
})
export class ownedPokemonService {
  pokemonCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.pokemonCollection = collection(
      firestore,
      'pokemon'
    ) as CollectionReference<ownedPokemon>;
  }

  getPokemons() {
    return collectionData(this.pokemonCollection, { idField: 'id' }) as Observable<ownedPokemon[]>;
  }

  getPokemon(id: string): Observable<ownedPokemon> {
    const pokemonDocRef = doc(this.firestore, `pokemon/${id}`);
    return docData(pokemonDocRef) as Observable<ownedPokemon>;
  }

  addPokemon(poke: ownedPokemon): Promise<void> {
    return addDoc(this.pokemonCollection, poke) as unknown as Promise<void>;
  }

  updatePokemon(id: string, poke: Partial<ownedPokemon>): Promise<void> {
    const pokemonDocRef = doc(this.firestore, `pokemon/${id}`);
    return updateDoc(pokemonDocRef, poke) as Promise<void>;
  }

  deletePokemon(id:string): Promise<void> {
    const pokemonDocRef = doc(this.firestore, `pokemon/${id}`);
    return deleteDoc(pokemonDocRef) as Promise<void>;
  }

  async testConnection() {
    const test = await getDocs(this.pokemonCollection);
    const paths = test.docs.map((doc) => {
      const { name, id } = doc.data();
      return {
        params : { name, id },
      };
    });
  
    return {
      paths,
      fallback: 'blocking',
    };
    
  }
}
