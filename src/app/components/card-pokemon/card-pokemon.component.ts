import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Result } from '../../models/pokeapi';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.css',
})
export class CardPokemonComponent implements OnChanges {
  @Input() data: Result | undefined;
  @Input() selected: boolean = false;
  @Input() fullData?: Pokemon;
  @Output() clicked = new EventEmitter<string>();

  idPk: string = '1';

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.extractInformation();
  }

  extractInformation() {
    if (this.data && this.data.url) {
      this.idPk = this.data.url.substring(34, this.data.url.length - 1);
      this.pokemonService.getById(this.idPk).then(() => {
        // Ensure the service call is made
      });
    } else if (this.fullData && this.fullData.species && this.fullData.species.url) {
      this.idPk = this.fullData.species.url.substring(
        42,
        this.fullData.species.url.length - 1
      );
      this.data = {
        name: this.fullData.species.name,
        url: '',
      };
    }
  }
}