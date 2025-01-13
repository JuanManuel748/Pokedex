import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PartyService } from '../../services/party.service';
import { party } from '../../models/party';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  parties: party[] = [];

  constructor(private companyService: CompanyService, private partyService: PartyService) {}

  ngOnInit(): void {
    this.partyService.getParties().subscribe((parties) => {
      this.parties = parties;
    });
    console.log(this.parties);
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  deleteCompany(id: string): void {
    this.companyService.deleteCompany(id);
  }
}