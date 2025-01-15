import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { exampleResult, Result } from '../../models/pokeapi';
import { Pokemon } from '../../models/pokemon';
import { NotificationComponent } from '../../components/notification/notification.component';
import { CardPokemonComponent } from '../../components/card-pokemon/card-pokemon.component';
import { DetailComponent } from '../../components/detail/detail.component';
import { PicturePokemonComponent } from '../../components/picture-pokemon/picture-pokemon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PicturePokemonComponent,
    CardPokemonComponent,
    DetailComponent,
    NotificationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pokemonList: Result[] = [];
  filteredPokemonList: Result[] = [];
  page: number = 1;
  loading: boolean = false;
  pokemonSelected?: Pokemon;
  detail: boolean = false;

  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';

  @ViewChild('cards') cardsElement: ElementRef | undefined;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadList();
  }

  async loadList() {
    if (this.loading) return;
    this.loading = true;
    const newPokemonList = await this.pokemonService.getByPage(this.page);
    this.pokemonList = [...this.pokemonList, ...newPokemonList];
    this.filteredPokemonList = this.pokemonList;
    this.page++;
    this.loading = false;
  }

  onScroll(e: any) {
    if (
      Math.round(
        this.cardsElement?.nativeElement.clientHeight +
          this.cardsElement?.nativeElement.scrollTop
      ) === e.srcElement.scrollHeight
    ) {
      this.loadList();
    }
  }

  async cardClick(e: string) {
    if (this.pokemonSelected && e === this.pokemonSelected?.toString()) {
      return this.changeDetail();
    }
    this.pokemonSelected = await this.pokemonService.getById(e);
  }

  changeDetail() {
    if (this.pokemonSelected) {
      this.detail = !this.detail;
    }
  }

  onSearch(event: any): void {
    this.showAlert = false;
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm) {
      // Busca primero en la lista cargada
      this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );

      if (this.filteredPokemonList.length === 0) {
        this.showAlert = false;
        // Si no está en la lista cargada, busca en el servicio
        this.pokemonService.getById(searchTerm).then(
          (pokemon) => {
            if (pokemon) {
              this.showAlert = false;
              // Si se encuentra, agrégalo a la lista filtrada
              this.filteredPokemonList = [
                {
                  name: pokemon.name,
                  url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
                },
              ];
              this.showAlert = false;
            } else {
              // Si no se encuentra, muestra un mensaje de error
              this.showError(searchTerm);
            }
          },
          (error) => {
            // Maneja el error si ocurre al consultar el servicio
            this.showError(searchTerm);
          }
        );
      }
    } else {
      // Si el término de búsqueda está vacío, restablece la lista filtrada
      this.filteredPokemonList = [...this.pokemonList];
    }
  }

  private showError(searchTerm: string): void {
    this.alertMessage = `No se encontró el Pokémon "${searchTerm}".`;
    this.alertClass = 'danger';
    this.showAlert = true;
  }
}
