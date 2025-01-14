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
  idPk: string = "0";
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';
  listAbilities: Ability2[] = [];
  listItems: Item[] = [];
  listMoves: Move2[] = [];
  tempPokemon: Pokemon = examplePokemon;
  selectedPokemon: ownedPokemon = exampleOwnedPokemon;

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
          this.showError(`Error al cargar el equipo: ${error}`, 'danger')
        },
        next: (party) => {
          if (party) {
            this.party = party;
          } else {
            this.showError(`El equipo con id ${this.id} no existe`, 'danger')
          }
        },
      });
    }
  }

  showError(message: string, type: string): void {
    this.alertMessage = message;
    this.alertClass = type;
    this.showAlert = true;
  }

  
  setPicture(url: string) {
    const imgElement = document.getElementById('pokemon_picture') as HTMLImageElement;
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

  // TERMINAR
  async ngOnInit(): Promise<void> {
    this.listItems = await this.pokemonService.getItems();
  }

  // TERMINAR
  async searchPokemon(): Promise<void> {
    const inputElement = document.getElementById('search_input') as HTMLInputElement;
    const value = inputElement.value.toLowerCase();
    if (value !== ' ' && value !== '') {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
        const dat = await fetch(url);
        
        if (dat.ok) {
          const data = await dat.json();
          console.log("Datos del search: " + data);
          
          //btn_info.classList.toggle("ON");
          // AÑADIR DATOS DEL POKEMON
          this.setNewPokemon(data);
          
        } else {
          console.log('pokemon no encontrado');
          this.showError(
            `No se ha podido encontrar al pokemon ${value}`,
            'danger'
          );
        }
      } catch (error) {
        console.log('error al buscar');
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
  async setNewPokemon(poke: any) {
    const name = poke.name;
    this.idPk = poke.id as string;
    const sprite = poke.sprites?.front_default;

    this.listMoves = await this.pokemonService.getPokemonMoves(this.idPk);
    this.listAbilities = await this.pokemonService.getPokemonAbilities(this.idPk);
    this.setMove("move1-select", this.listMoves[0])
    this.setMove("move2-select", this.listMoves[1])
    this.setMove("move3-select", this.listMoves[2])
    this.setMove("move4-select", this.listMoves[3])
    
    const abilityElement = document.getElementById("abilities-select") as HTMLSelectElement;
    if (abilityElement) {
      abilityElement.value = this.listAbilities[1].name;
    }
    this.setPicture(sprite);
  }

  
}
