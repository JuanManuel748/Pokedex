import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Result } from '../../models/pokeapi';
import { Pokemon } from '../../models/pokemon';
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
    DetailComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  pokemonList: Result[] = [];
  page: number = 1;
  loading: boolean = false;
  pokemonSelected?: Pokemon;
  detail: boolean = false;

  @ViewChild('cards') cardsElement: ElementRef | undefined;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadList();
  }

  async loadList() {
    if (this.loading) return;
    this.loading = true;
    this.pokemonList = [
      ...this.pokemonList,
      ...(await this.pokemonService.getByPage(this.page)),
    ];
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
}
