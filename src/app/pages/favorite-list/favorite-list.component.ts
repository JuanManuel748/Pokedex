import { Component, OnInit } from '@angular/core';
import { Favorite } from '../../models/favorite';
import { FavoriteService } from '../../services/favorite.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css',
})
export class FavoriteListComponent implements OnInit {
  favourites: Favorite[] = [];
  filteredFavourites: Favorite[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    
    this.favoriteService.getfavorites().subscribe((fav) => {
      this.favourites = fav;
      this.filteredFavourites = fav;
    });
  }

  deleteFav(id: string): void {
    this.favoriteService.deleteFavorite(id);
  }

  search(): void {
    const searchInput = (document.getElementById('search_input') as HTMLInputElement).value.toLowerCase();
    if(searchInput != "") {
      // Filtrar favoritos por nombre de usuario (suponiendo que 'name' es el atributo del usuario)
      this.filteredFavourites = this.favourites.filter(fav =>
        fav.user.toLowerCase().includes(searchInput) // Compara el nombre sin importar mayúsculas o minúsculas
      );
    } else {
      // Si no hay búsqueda, mostrar todos los favoritos
      this.filteredFavourites = [...this.favourites];
    }
  }
}
