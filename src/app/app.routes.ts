import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyAddComponent } from './pages/company-add/company-add.component';
import { CompanyEditComponent } from './pages/company-edit/company-edit.component';
import { PartyListComponent } from './pages/party-list/party-list.component';
import { LoginGoogleComponent } from './pages/login-google/login-google.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorPageComponent } from './pages/error/error-page.component';
import { PartyEditComponent } from './pages/party-edit/party-edit.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';
import { FavoriteEditComponent } from './pages/favorite-edit/favorite-edit.component';
import { FavoriteAddComponent } from './pages/favorite-add/favorite-add.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'hola-mundo', component: HelloWorldComponent },
    { path: 'login', component: LoginGoogleComponent },
    
    { path: 'parties', component: PartyListComponent},
    { path: 'parties/add', component: PartyListComponent},
    { path: 'parties/edit/:id', component: PartyEditComponent},

    { path: 'favs', component: FavoriteListComponent},
    { path: 'favs/add', component: FavoriteAddComponent},
    { path: 'favs/edit/:id', component: FavoriteEditComponent},




    { path: 'empresas', component: CompanyListComponent, canActivate: [AuthGuard]  },
    { path: 'empresas/anadir', component: CompanyAddComponent, canActivate: [AuthGuard] },
    { path: 'empresas/editar/:id', component: CompanyEditComponent, canActivate: [AuthGuard] },

    
    { path: '**', component: ErrorPageComponent }
];