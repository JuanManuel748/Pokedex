import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../../components/notification/notification.component';
import { party } from '../../models/party';
import { PartyService } from '../../services/party.service';
import { ownedPokemonService } from '../../services/ownedpokemon.service';
import { exampleOwnedPokemon, ownedPokemon } from '../../models/ownedPokemon';
import {
  Ability,
  Ability2,
  examplePokemon,
  Item,
  Move2,
  Pokemon,
} from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { PokeapiService } from '../../services/pokeapi.service';
import { Result } from '../../models/pokeapi';

@Component({
  selector: 'app-party-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './party-edit.component.html',
  styleUrl: './party-edit.component.css',
})
export class PartyEditComponent implements OnInit {
  party: party = {
    name: 'example_party',
    poke_1: exampleOwnedPokemon,
    poke_2: exampleOwnedPokemon,
    poke_3: exampleOwnedPokemon,
    poke_4: exampleOwnedPokemon,
    poke_5: exampleOwnedPokemon,
    poke_6: exampleOwnedPokemon,
  };
  id: string = '';
  idPk: string = '0';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';
  listAbilities: Ability2[] = [];
  listItems: Item[] = [];
  listMoves: Move2[] = [];
  tempPokemon: Pokemon = examplePokemon;
  selectedPokemon: ownedPokemon = exampleOwnedPokemon;

  listPokemons: ownedPokemon[] = [];

  constructor(
    private partyService: PartyService,
    private pokemonService: PokemonService,
    private ownedService: ownedPokemonService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params[`id`];
    if (this.id) {
      this.partyService.getParty(this.id).subscribe({
        error: (error) => {
          this.showError(`Error al cargar el equipo: ${error}`, 'danger');
        },
        next: (party) => {
          if (party) {
            this.party = party;
          } else {
            this.showError(`El equipo con id ${this.id} no existe`, 'danger');
          }
        },
      });
      
    
      
    this.partyService.getPartyPokemons(this.id).subscribe((pokemons) => {
      this.listPokemons = pokemons;
      this.loadPokemons();
    })
    }

  }

  showError(message: string, type: string): void {
    this.alertMessage = message;
    this.alertClass = type;
    this.showAlert = true;
  }

  setPicture(id:string, url: string) {
    const imgElement = document.getElementById(
      id
    ) as HTMLImageElement;
    if (imgElement) {
      imgElement.src = url;
    }
  }

  updateParty() {
    if (this.id) {
      this.partyService
        .updateParty(this.id, this.party)
        .then(() => {
          this.showError(`Equipo editado correctamente`, 'success');
        })
        .catch((error) => {
          this.showError(`Error al editar el equipo: ${error}`, 'danger');
        });
    }
  }

  async setNewPokemon(poke: any) {
    const name = poke.name;
    this.idPk = poke.id as string;
    const sprite = poke.sprites?.front_default;

    this.listMoves = await this.pokemonService.getPokemonMoves(this.idPk);
    this.listAbilities = await this.pokemonService.getPokemonAbilities(
      this.idPk
    );

    this.setMove('move1-select', this.listMoves[0]);
    this.setMove('move2-select', this.listMoves[1]);
    this.setMove('move3-select', this.listMoves[2]);
    this.setMove('move4-select', this.listMoves[3]);

    const abilityElement = document.getElementById(
      'ability-select'
    ) as HTMLSelectElement;
    const ability = this.listAbilities[0];
    if (abilityElement) {
      abilityElement.value = ability.name;
    }

    const item = this.listItems[0];
    const itemElement = document.getElementById(
      'item-select'
    ) as HTMLSelectElement;
    if (itemElement) {
      itemElement.value = item.name;
    }
    this.setPicture('pokemon_picture', sprite);
  }

  // TERMINAR
  async ngOnInit(): Promise<void> {
    this.listItems = await this.pokemonService.getItems();
  
    this.ownedService.getPokemons().subscribe((pokemons) => {
      this.listPokemons = pokemons;
    });
  
    this.partyService.getPartyPokemons(this.id).subscribe((pokemons) => {
      this.listPokemons = pokemons;
      this.loadPokemons();
    });
  }
  // search

  async searchPokemon(): Promise<void> {
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
          this.setNewPokemon(data);
        } else {
          this.showError(
            `No se ha podido encontrar al pokemon ${value}`,
            'danger'
          );
        }
      } catch (error) {
        this.showError('Ha habido un error al buscar al pokemon', 'danger');
      }
    }
  }

  setMove(id: string, move: Move2) {
    const moveElement = document.getElementById(id) as HTMLSelectElement;
    if (moveElement) {
      moveElement.value = move.name;
    }
  }

  setMoves(id: string, move: string) {
    const moveElement = document.getElementById(id) as HTMLSelectElement;
    if (moveElement) {
      moveElement.value = move;
    }
  }

  async onPokemonButtonClick(pokemon: ownedPokemon) {
    let idPokemon = '';
    switch (pokemon) {
      case this.party.poke_1:
        idPokemon = this.party.poke_1.id?.toString() || '';
        break;
      case this.party.poke_2:
        idPokemon = this.party.poke_2.id?.toString() || '';
        break;
      case this.party.poke_3:
        idPokemon = this.party.poke_3.id?.toString() || '';
        break;
      case this.party.poke_4:
        idPokemon = this.party.poke_4.id?.toString() || '';
        break;
      case this.party.poke_5:
        idPokemon = this.party.poke_5.id?.toString() || '';
        break;
      case this.party.poke_6:
        idPokemon = this.party.poke_6.id?.toString() || '';
        break;
    }
    this.ownedService.getPokemon(idPokemon).subscribe((pokemon) => {
      if (pokemon) {
        this.selectedPokemon = pokemon;
        this.setPokemon(this.selectedPokemon);
      } else {
        this.showError(`Pokemon with id ${idPokemon} not found`, 'danger');
      }
    });

    this.loadPokemons();

    
  }

  loadPokemons() {
    console.log("Cargando pokemons");
    this.listPokemons.forEach((poke, index) => {
      console.log(poke);
      this.setPicture(`picture_poke_${index + 1}`, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.idPk}.png`);
    });
  }



  // TERMINAR
  async setPokemon(poke: ownedPokemon) {
    const name = poke.name;
    this.idPk = poke.idPk;
    const item = poke.item;
    const ability = poke.abilitie;
    const move_1 = poke.move_1;
    const move_2 = poke.move_2;
    const move_3 = poke.move_3;
    const move_4 = poke.move_4;

    this.listMoves = await this.pokemonService.getPokemonMoves(this.idPk);
    this.listAbilities = await this.pokemonService.getPokemonAbilities(
      this.idPk
    );

    const nameElement = document.getElementById(
      'name_pokemon'
    ) as HTMLInputElement;
    if (nameElement) {
      nameElement.value = name;
    }

    const itemElement = document.getElementById(
      'item-select'
    ) as HTMLSelectElement;
    if (itemElement) {
      itemElement.value = item;
    }
    
    const abilityElement = document.getElementById(
      'ability-select'
    ) as HTMLSelectElement;
    if (abilityElement) {
      abilityElement.value = ability;
    }

    this.setMoves('move1-select', move_1);
    this.setMoves('move2-select', move_2);
    this.setMoves('move3-select', move_3);
    this.setMoves('move4-select', move_4);

    this.setPicture('pokemon_picture', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.idPk}.png`);  
  }
}
