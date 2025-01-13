import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-company-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './company-add.component.html',
  styleUrl: './company-add.component.css',
})
export class CompanyAddComponent {
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";
  companyForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(private companyService: CompanyService) {}

  submitCompany() {
    let newCompany: Company = {
      name: this.companyForm.value.name ?? "",
      address: this.companyForm.value.address ?? "",
      phone: this.companyForm.value.phone ?? "",
      email: this.companyForm.value.email ?? ""
    }
    this.companyService.addCompany(newCompany).then(()=>{
      this.alertMessage = `Añadida empresa ${this.companyForm.value.name}`;
      this.alertClass = "success";
      this.showAlert = true;
      this.companyForm.reset();
    }).catch((error) => {
      this.alertMessage = `Error al añadir empresa ${this.companyForm.value.name}: ${error}`;
      this.alertClass = "danger";
      this.showAlert = true;
    });
  }
}