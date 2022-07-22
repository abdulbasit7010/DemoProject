import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConfigAddComponent } from './service-config-add.component';

describe('ServiceConfigAddComponent', () => {
  let component: ServiceConfigAddComponent;
  let fixture: ComponentFixture<ServiceConfigAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceConfigAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceConfigAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
