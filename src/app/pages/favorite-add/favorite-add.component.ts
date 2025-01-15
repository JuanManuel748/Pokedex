import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from '../../components/notification/notification.component';
import { FavoriteService } from '../../services/favorite.service';
import { Favorite } from '../../models/favorite';
import { examplePokemon, Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-favorite-add',
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './favorite-add.component.html',
  styleUrl: './favorite-add.component.css',
})
export class FavoriteAddComponent implements OnChanges {
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';
  favForm = new FormGroup({
    user: new FormControl('example_user'),
    idPoke: new FormControl('1'),
    name_poke: new FormControl('example_name'),
  });
  tempPoke = examplePokemon;

  constructor(private favService: FavoriteService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const idPoke = this.favForm.get('idPoke')?.value;
    this.tempPoke.id = idPoke || '';
    this.getPokemonImageUrl(this.tempPoke.id);
  }


  updateId() {
    let idElement = document.getElementById('idPoke') as HTMLInputElement;
    let value = idElement.value.toLowerCase();
    this.tempPoke.id = value;
    this.getPokemonImageUrl(this.tempPoke.id);
  }

  submitFav() {
    if (this.validateFields()) {
      let newFav: Favorite = {
        user: this.favForm.value.user ?? '',
        idPoke: this.favForm.value.idPoke ?? '',
        name_poke: this.favForm.value.name_poke ?? '',
      };
      this.favService
        .addFavorite(newFav)
        .then(() => {
          this.alertMessage = `Añadido favorito ${this.favForm.value.user}`;
          this.alertClass = 'success';
          this.showAlert = true;
          this.favForm.reset();
        })
        .catch((error) => {
          this.alertMessage = `Error al añadir favorito ${this.favForm.value.user}: ${error}`;
          this.alertClass = 'danger';
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
      this.alertMessage = 'Todos los campos son obligatorios.';
      this.alertClass = 'danger';
      this.showAlert = true;
    } else if (
      isNaN(Number(idPoke)) ||
      Number(idPoke) < 1 ||
      Number(idPoke) > 1000
    ) {
      resultB = false;
      this.alertMessage =
        'El ID del Pokémon debe ser un número entre 1 y 1000.';
      this.alertClass = 'danger';
      this.showAlert = true;
    } else {
      this.showAlert = false;
    }
    return resultB;
  }

  getPokemonImageUrl(id: any): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  async search() {
    this.showAlert = false;
    const inputElement = document.getElementById(
      'search_input'
    ) as HTMLInputElement;
    const value = inputElement.value.toLowerCase();
    if (value !== ' ' && value !== '') {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
        const dat = await fetch(url);

        if (dat.ok) {
          const data = await dat.json();
          console.log(data);
          // poner DATOS
          this.tempPoke = data;
          let idPokemon = this.tempPoke.id;
          if (idPokemon) {
            // hacer que se ponga el valor de idPokemon en el input con id "idPoke"
            const idPokeInput = document.getElementById(
              'idPoke'
            ) as HTMLInputElement;
            idPokeInput.value = idPokemon.toString();
            this.getPokemonImageUrl(idPokemon);
          }
        } else {
          (this.alertMessage = `No se ha podido encontrar al pokemon ${value}`),
            (this.alertClass = 'danger');
          this.showAlert = true;
        }
      } catch (error) {
        (this.alertMessage = 'Ha habido un error al buscar al pokemon'),
          (this.alertClass = 'danger');
        this.showAlert = true;
      }
    }
  }
}
