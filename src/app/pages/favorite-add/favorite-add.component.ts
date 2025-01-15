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

  getPokemonImageUrl(): string {
    const idPoke = this.favForm.get('idPoke')?.value;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPoke}.png`;
  }
}