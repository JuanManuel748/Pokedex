import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PartyService } from '../../services/party.service';
import { party } from '../../models/party';
import { ownedPokemon } from '../../models/ownedPokemon';

@Component({
  selector: 'app-party-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './party-list.component.html',
  styleUrl: './party-list.component.css'
})
export class PartyListComponent implements OnInit {
  parties: party[] = [];
  listPokemons: ownedPokemon[] = [];

  constructor(private companyService: CompanyService, private partyService: PartyService, private router: Router) {}

  ngOnInit(): void {
    this.partyService.getParties().subscribe((parties) => {
      this.parties = parties;
    });
  }
  /*
  // hacer una funcion que por cada pokemon de party lo busque con el ownedPokemonService usando una cosa parecida a esta
      this.ownedService.getPokemon(idPokemon).subscribe((pokemon) => {
      if (pokemon) {
        this.selectedPokemon = pokemon;
        this.setPokemon(this.selectedPokemon);
      } else {
        this.showError(`Pokemon with id ${idPokemon} not found`, 'danger');
      }
    });
    
        luego cuando tengas los ownedPokemon coges la id de cada uno y la metes en esta funcion:
        setPicture(url: string) {
    const imgElement = document.getElementById(
      'pokemon_picture' // cambiar para coincidir con la id
    ) as HTMLImageElement;
    if (imgElement) {
      imgElement.src = url;
    }
  }
        

  */
  deleteParty(id: string): void {
    this.partyService.deleteParty(id);
  }
}