import { Component, Input } from '@angular/core';
import { party } from '../../models/party';

@Component({
  selector: 'app-card-party',
  imports: [],
  templateUrl: './card-party.component.html',
  styleUrl: './card-party.component.css'
})

export class CardPartyComponent {
  @Input() fullData?: party;
}
