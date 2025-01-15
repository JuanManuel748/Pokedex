import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, docData, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoriteCollection: CollectionReference;


  constructor(private firestore: Firestore) {
    this.favoriteCollection = collection(this.firestore, 'favorite');
  }

  // Obtener todas las Favorites
  getfavorites(): Observable<Favorite[]> {
    return collectionData(this.favoriteCollection, { idField: 'id' }) as Observable<Favorite[]>;
  }

  // Obtener una Favorite por ID
  getFavorite(id: string): Observable<Favorite | undefined> {
    const FavoriteDocRef = doc(this.firestore, `favorite/${id}`);
    return docData(FavoriteDocRef) as Observable<Favorite | undefined>;
  }

  // Agregar una nueva Favorite
  addFavorite(Favorite: Favorite): Promise<void> {
    return addDoc(this.favoriteCollection, Favorite) as unknown as Promise<void>;
  }

  // Actualizar una Favorite existente
  updateFavorite(id: string, Favorite: Partial<Favorite>): Promise<void> {
    const FavoriteDocRef = doc(this.firestore, `favorite/${id}`);
    return updateDoc(FavoriteDocRef, Favorite) as Promise<void>;
  }

  // Eliminar una Favorite
  deleteFavorite(id: string): Promise<void> {
    const FavoriteDocRef = doc(this.firestore, `favorite/${id}`);
    return deleteDoc(FavoriteDocRef) as Promise<void>;
  }
}