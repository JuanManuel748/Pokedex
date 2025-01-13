import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth, private router: Router) {
    // Escucha los cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user); // Actualiza el usuario en el observable
    });
  }

  // Iniciar sesión con Google
  loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then(() => {
        this.router.navigate(['/']); // Redirigir al listado después del login
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
        throw error;
      });
  }

  // Cerrar sesión
  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/']); // Redirigir a la portada después del logout.
    });
  }

  // Obtener el usuario autenticado actualmente
  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}