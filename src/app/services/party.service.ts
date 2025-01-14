import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  doc,
  docData,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { party } from '../models/party';
import { exampleOwnedPokemon, ownedPokemon } from '../models/ownedPokemon';
import { ownedPokemonService } from './ownedpokemon.service';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  partyCollection: CollectionReference;
  tempParty: party = {
    name: '',
    poke_1: exampleOwnedPokemon,
    poke_2: exampleOwnedPokemon,
    poke_3: exampleOwnedPokemon,
    poke_4: exampleOwnedPokemon,
    poke_5: exampleOwnedPokemon,
    poke_6: exampleOwnedPokemon,
  };
  id: string = '';
  listPokemons: ownedPokemon[] = [];
  tempList: ownedPokemon[] = [];

  constructor(
    private firestore: Firestore,
    private ownedService: ownedPokemonService
  ) {
    this.partyCollection = collection(
      firestore,
      'party'
    ) as CollectionReference<party>;
  }

  getParties() {
    return collectionData(this.partyCollection, {
      idField: 'id',
    }) as Observable<party[]>;
  }

  getParty(id: string): Observable<party> {
    const partyDocRef = doc(this.firestore, `party/${id}`);
    return docData(partyDocRef) as Observable<party>;
  }

  addParty(party: party): Promise<void> {
    return addDoc(this.partyCollection, party) as unknown as Promise<void>;
  }

  updateParty(id: string, party: Partial<party>): Promise<void> {
    const partyDocRef = doc(this.firestore, `party/${id}`);
    return updateDoc(partyDocRef, party) as Promise<void>;
  }

  deleteParty(id: string): Promise<void> {
    const partyDocRef = doc(this.firestore, `party/${id}`);
    return deleteDoc(partyDocRef) as Promise<void>;
  }


getPartyPokemons(id: string): Observable<ownedPokemon[]> {
  this.tempList = []; 
  return this.getParty(id).pipe(
    switchMap((party) => {
      this.tempParty = party;
      const pokemonIds = [
        party.poke_1?.id,
        party.poke_2?.id,
        party.poke_3?.id,
        party.poke_4?.id,
        party.poke_5?.id,
        party.poke_6?.id
      ].filter((id): id is string => !!id); 

      const pokemonObservables = pokemonIds.map(pokemonId => 
        this.ownedService.getPokemon(pokemonId).pipe(
          map(pokemon => {
            if (pokemon) {
              this.tempList.push(pokemon);
            }
          })
        )
      );

      return forkJoin(pokemonObservables).pipe(
        map(() => this.tempList)
      );
    }),
    map((tempList) => {
      if (tempList.length > 0) {
        console.log("Cambiando listas " + tempList.length);
        this.listPokemons = tempList;
      } else {
        console.log("No se han cambiado las listas " + tempList.length);
      }
      return this.listPokemons;
    })
  );
}

  

  async testConnection() {
    const test = await getDocs(this.partyCollection);

    console.log(test);
    const paths = test.docs.map((doc) => {
      const { name, poke_1 } = doc.data();
      return {
        params: { name, poke_1 },
      };
    });

    return {
      paths,
      fallback: 'blocking',
    };
  }
}
