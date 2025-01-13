import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPartyComponent } from './card-party.component';

describe('CardPartyComponent', () => {
  let component: CardPartyComponent;
  let fixture: ComponentFixture<CardPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPartyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
