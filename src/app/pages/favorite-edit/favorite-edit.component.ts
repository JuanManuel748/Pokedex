import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../components/notification/notification.component";
import { Favorite } from '../../models/favorite';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorite-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './favorite-edit.component.html',
  styleUrl: './favorite-edit.component.css'
})
export class FavoriteEditComponent {
  fav: Favorite = { user: '', name_poke: '', idPoke: ''};
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";

  constructor(private favService: FavoriteService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      console.log("ID: " + this.id);
      this.favService.getFavorite(this.id).subscribe({
        error: (error) => {
          this.alertMessage = `Error al cargar la empresa: ${error}`;
          this.alertClass = "danger";
          this.showAlert = true;
        },
        next: (fav) => {
          if (fav) {
            this.fav = fav;
          } else {
            this.alertMessage = `La empresa con id ${this.id} no existe`;
            this.alertClass = "danger";
            this.showAlert = true;
          }
        }
      });
    }
  }

  updateFavorite() {
    if (this.id) {
      if (this.validateFields()) {
        this.favService.updateFavorite(this.id, this.fav).then(() => {
          this.alertMessage = `Favorito editado correctamente`;
          this.alertClass = "success";
          this.showAlert = true;
        }).catch((error) => {
          this.alertMessage = `Error al editar el favorito: ${error}`;
          this.alertClass = "danger";
          this.showAlert = true;
        });

      } else {
        this.alertMessage = `Error al editar el favorito`;
        this.alertClass = "danger";
        this.showAlert = true;
      }
    }
  }

  validateFields(): boolean {
    let resultB = true;
  
    if (!this.fav.user || !this.fav.name_poke || !this.fav.idPoke) {
      resultB = false;
      this.alertMessage = "Todos los campos son obligatorios.";
      this.alertClass = "danger";
      this.showAlert = true;
    } else if (isNaN(Number(this.fav.idPoke)) || Number(this.fav.idPoke) < 1 || Number(this.fav.idPoke) > 1000) {
      resultB = false;
      this.alertMessage = "El ID del Pokémon debe ser un número entre 1 y 1000.";
      this.alertClass = "danger";
      this.showAlert = true;
    } else {
      this.showAlert = false;
    }
    return resultB;
  }

  getPokemonImageUrl(): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.fav.idPoke}.png`;
  }
}