// filepath: /c:/Users/junpe/Desktop/DAM 2/PROGRAMACION/Angular/Pokedex/pokedex/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error/error-page.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';
import { FavoriteEditComponent } from './pages/favorite-edit/favorite-edit.component';
import { FavoriteAddComponent } from './pages/favorite-add/favorite-add.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginGoogleComponent } from './pages/login-google/login-google.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginGoogleComponent },
    { path: 'favs', component: FavoriteListComponent },
    { path: 'favs/add', component: FavoriteAddComponent },
    { path: 'favs/edit/:id', component: FavoriteEditComponent },
    { path: '**', component: ErrorPageComponent }
];