import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringsBasedChargingViewComponent } from './strings-based-charging-view.component';

describe('StringsBasedChargingViewComponent', () => {
  let component: StringsBasedChargingViewComponent;
  let fixture: ComponentFixture<StringsBasedChargingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringsBasedChargingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringsBasedChargingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
