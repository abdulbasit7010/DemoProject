import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringsBasedChargingComponent } from './strings-based-charging.component';

describe('StringsBasedChargingComponent', () => {
  let component: StringsBasedChargingComponent;
  let fixture: ComponentFixture<StringsBasedChargingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringsBasedChargingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringsBasedChargingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
