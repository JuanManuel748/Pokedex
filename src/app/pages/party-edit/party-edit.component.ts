import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../../components/notification/notification.component';
import { party } from '../../models/party';
import { PartyService } from '../../services/party.service';
import { ownedPokemonService } from '../../services/ownedpokemon.service';
import { exampleOwnedPokemon, ownedPokemon } from '../../models/ownedPokemon';
import { examplePokemon, Pokemon } from '../../models/pokemon';
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
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';
  tempPokemon: Pokemon | undefined;
  selectedPokemon: ownedPokemon = exampleOwnedPokemon;
  name: string = "example name";
  abilitie: string = "example abilitie";
  item: string = "example item";
  move_1: string = "example move";
  move_2: string = "example move";
  move_3: string = "example move";
  move_4: string = "example move";
  listAbilities: string [] = [];
  listItems: Result [] = [];
  listMoves: Result [] = [];

  async ngOnInit(): Promise<void> {
    this.tempPokemon = examplePokemon;
    this.listItems = await this.pokeapiService.getItems(0);
    this.listMoves = await this.pokeapiService.getMoves(0);
  }

  constructor(
    private partySerive: PartyService,
    private pokeapiService: PokeapiService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params[`id`];
    if (this.id) {
      this.partySerive.getParty(this.id).subscribe({
        error: (error) => {
          this.alertMessage = `Error al cargar el equipo: ${error}`;
          this.alertClass = 'danger';
          this.showAlert = true;
        },
        next: (party) => {
          if (party) {
            this.party = party;
          } else {
            this.alertMessage = `El equipo con id ${this.id} no existe`;
            this.alertClass = 'danger';
            this.showAlert = true;
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
      this.partySerive
        .updateParty(this.id, this.party)
        .then(() => {
          this.alertMessage = `Equipo editado correctamente`;
          this.alertClass = 'success';
          this.showAlert = true;
        })
        .catch((error) => {
          this.alertMessage = `Error al editar el equipo: ${error}`;
          this.alertClass = 'danger';
          this.showAlert = true;
        });
    }
  }

  setPokemon(poke: ownedPokemon) {

  }

  


  async searchPokemon(): Promise<void> {
    const inputElement = document.getElementById('search_input') as HTMLInputElement;
    const value = inputElement.value.toLowerCase();

    if (value !== ' ' && value !== '') {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
        const dat = await fetch(url);
        
        if (dat.ok) {
          const data = await dat.json();
          console.log(data);
          //btn_info.classList.toggle("ON");
          // AÑADIR DATOS DEL POKEMON
          this.extractPokemonAttributes(data);
          
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

  extractPokemonAttributes(data: any) {
    const name = data.name;
    const id = data.id;
    const frontSprite = data.sprites.front_default;
    const abilities = data.abilities.map((ability: any) => ability.ability.name);
    const randomAbilitie = abilities[0];

    this.selectedPokemon.name = name;
    this.selectedPokemon.idPk = id;
    this.setPicture(frontSprite)
  }

  

  setNewAttributtes(data: any) {
    // set item

    // set moves
    // set move_1
    // set move_2
    // set move_3
    // set move_4

  }
}
