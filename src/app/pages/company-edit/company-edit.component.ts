import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../components/notification/notification.component";

@Component({
  selector: 'app-company-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.css'
})
export class CompanyEditComponent {
  company: Company = { name: '', address: '', phone: '', email: ''};
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";

  constructor(private companyService: CompanyService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      // Obtener los detalles de la empresa desde Firestore
      console.log(this.id);
      this.companyService.getCompany(this.id).subscribe({
        error: (error) => {
          this.alertMessage = `Error al cargar la empresa: ${error}`;
          this.alertClass = "danger";
          this.showAlert = true;
        },
        next: (company) => {
          if (company) {
            this.company = company;
          } else {
            this.alertMessage = `La empresa con id ${this.id} no existe`;
            this.alertClass = "danger";
            this.showAlert = true;
          }
        }
      });
    }
  }

  updateCompany() {
    if (this.id) {
      this.companyService.updateCompany(this.id, this.company).then(() => {
        this.alertMessage = `Empresa editada correctamente`;
        this.alertClass = "success";
        this.showAlert = true;
      }).catch((error) => {
        this.alertMessage = `Error al editar la empresa: ${error}`;
        this.alertClass = "danger";
        this.showAlert = true;
      });
    }
  }
}