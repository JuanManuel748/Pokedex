import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteAddComponent } from './favorite-add.component';

describe('FavoriteAddComponent', () => {
  let component: FavoriteAddComponent;
  let fixture: ComponentFixture<FavoriteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
