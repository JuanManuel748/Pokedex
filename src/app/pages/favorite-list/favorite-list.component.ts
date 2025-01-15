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
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent implements OnInit {
  favourites: Favorite[] = [];

  constructor(private favoriteService: FavoriteService, private router: Router) {}

  ngOnInit(): void {
    this.favoriteService.getfavorites().subscribe((fav) => {
      this.favourites = fav;
    });
  }

  deleteFav(id: string): void {
    this.favoriteService.deleteFavorite(id);
  }

}
