import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyEditComponent } from './party-edit.component';

describe('PartyEditComponent', () => {
  let component: PartyEditComponent;
  let fixture: ComponentFixture<PartyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
