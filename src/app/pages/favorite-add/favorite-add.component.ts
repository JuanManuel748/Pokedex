import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from '../../components/notification/notification.component';
import { FavoriteService } from '../../services/favorite.service';
import { Favorite } from '../../models/favorite';

@Component({
  selector: 'app-favorite-add',
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './favorite-add.component.html',
  styleUrl: './favorite-add.component.css'
})
export class FavoriteAddComponent {
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";
  favForm = new FormGroup({
    user: new FormControl('example_user'),
    idPoke: new FormControl('1'),
    name_poke: new FormControl('example_name'),
  });

  constructor(private favService: FavoriteService) {}

  submitFav() {
    if (this.validateFields()) {
      let newFav: Favorite = {
        user: this.favForm.value.user ?? "",
        idPoke: this.favForm.value.idPoke ?? "",
        name_poke: this.favForm.value.name_poke ?? ""
      }
      this.favService.addFavorite(newFav).then(() => {
        this.alertMessage = `Añadido favorito ${this.favForm.value.user}`;
        this.alertClass = "success";
        this.showAlert = true;
        this.favForm.reset();
      }).catch((error) => {
        this.alertMessage = `Error al añadir favorito ${this.favForm.value.user}: ${error}`;
        this.alertClass = "danger";
        this.showAlert = true;
      });
    }
  }

  validateFields(): boolean {
    let resultB = true;
    const user = this.favForm.get('user')?.value;
    const name_poke = this.favForm.get('name_poke')?.value;
    const idPoke = this.favForm.get('idPoke')?.value;

    if (!user || !name_poke || !idPoke) {
      resultB = false;
      this.alertMessage = "Todos los campos son obligatorios.";
      this.alertClass = "danger";
      this.showAlert = true;
    } else if (isNaN(Number(idPoke)) || Number(idPoke) < 1 || Number(idPoke) > 1000) {
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
    const idPoke = this.favForm.get('idPoke')?.value;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPoke}.png`;
  }
}