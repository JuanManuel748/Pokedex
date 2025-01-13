import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PartyService } from '../../services/party.service';
import { party } from '../../models/party';

@Component({
  selector: 'app-party-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './party-list.component.html',
  styleUrl: './party-list.component.css'
})
export class PartyListComponent implements OnInit {
  parties: party[] = [];

  constructor(private companyService: CompanyService, private partyService: PartyService, private router: Router) {}

  ngOnInit(): void {
    this.partyService.getParties().subscribe((parties) => {
      this.parties = parties;
      console.log(this.parties);
    });
  }

  deleteParty(id: string): void {
    this.partyService.deleteParty(id);
  }
}