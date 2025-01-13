import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, docData, deleteDoc, CollectionReference, DocumentReference, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { party } from '../models/party';


@Injectable({
  providedIn: 'root'
})
export class PartyService {
  partyCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.partyCollection = collection(firestore, 'party') as CollectionReference<party>;
  }

  getParties(){
        return collectionData(this.partyCollection, { idField: 'id' }) as Observable<party[]>;
    
  }

  getParty(id: string): Observable<party | undefined> {
    const partyDocRef = doc(this.firestore, `party/${id}`);
    return docData(partyDocRef) as Observable<party | undefined>;
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

  // Método de prueba para verificar la conexión a Firebase
  async testConnection() {
    const test = await getDocs(this.partyCollection);

    console.log(test)
    const paths = test.docs.map((doc) => {
      const { name, poke_1 } = doc.data();
      return {
        params : { name, poke_1 },
      };
    });
  
    return {
      paths,
      fallback: 'blocking',
    };
    
  }
}