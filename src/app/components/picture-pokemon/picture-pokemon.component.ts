import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-picture-pokemon',
  imports: [CommonModule],
  templateUrl: './picture-pokemon.component.html',
  styleUrl: './picture-pokemon.component.css'
})
export class PicturePokemonComponent {
  @Input() pokemon?: Pokemon;
}
