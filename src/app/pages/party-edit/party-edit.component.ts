import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../components/notification/notification.component";
import { party } from '../../models/party';
import { PartyService } from '../../services/party.service';

@Component({
  selector: 'app-party-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './party-edit.component.html',
  styleUrl: './party-edit.component.css'
})
export class PartyEditComponent {
  party: party = { name: '', poke_1: '', poke_2: '', poke_3: '', poke_4: '', poke_5: '', poke_6: '', }
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";

  constructor(private partySerive: PartyService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params[`id`];
    if(this.id) {
      console.log(this.id);
      this.partySerive.getParty(this.id).subscribe({
        error: (error) => {
          this.alertMessage = `Error al cargar el equipo: ${error}`;
          this.alertClass = "danger";
          this.showAlert = true;
        },
        next: (party) => {
          if (party) {
            this.party = party;
          } else {
            this.alertMessage = `El equipo con id ${this.id} no existe`;
            this.alertClass = "danger";
            this.showAlert = true;
          }
        }
      })
    }
  }

  updateParty() {
    if (this.id) {
      this.partySerive.updateParty(this.id, this.party).then(() => {
        this.alertMessage = `Equipo editado correctamente`;
        this.alertClass = "success";
        this.showAlert = true;
      }).catch((error) => {
        this.alertMessage = `Error al editar el equipo: ${error}`;
        this.alertClass = "danger";
        this.showAlert = true;
      });
    }
  }

}
