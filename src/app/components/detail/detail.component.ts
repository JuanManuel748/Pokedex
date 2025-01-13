import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { CardPokemonComponent } from '../card-pokemon/card-pokemon.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, CardPokemonComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnChanges{
  @Input() pokemon?: Pokemon;
  @Input() open:boolean = false;
  @Output() clicked = new EventEmitter();

  description: string = "";

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pokemon) {
      if(this.pokemon?.id !== undefined) {
        this.pokemonService.getDescription(this.pokemon.id).then((res) => {
          this.description = res;
        });
      }
    }
  }

  getType(type: string): string {
    switch (type) {
      case 'bug':
        return 'tipo-bicho';
      case 'dragon':
        return 'tipo-dragon';
      case 'fairy':
        return 'tipo-hada';
      case 'fire':
        return 'tipo-fuego';
      case 'ghost':
        return 'tipo-fantasma';
      case 'ground':
        return 'tipo-tierra';
      case 'normal':
        return 'tipo-normal';
      case 'psychic':
        return 'tipo-psiquico';
      case 'steel':
        return 'tipo-acero';
      case 'dark':
        return 'tipo-siniestro';
      case 'electric':
        return 'tipo-electrico';
      case 'fighting':
        return 'tipo-lucha';
      case 'flying':
        return 'tipo-volador';
      case 'grass':
        return 'tipo-planta';
      case 'poison':
        return 'tipo-veneno';
      case 'ice':
        return 'tipo-hielo';
      case 'water':
        return 'tipo-agua';
      case 'rock':
        return 'tipo-roca';
      default:
        return '';
    }
  }
}
