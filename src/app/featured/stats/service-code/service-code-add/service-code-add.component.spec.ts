import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCodeAddComponent } from './service-code-add.component';

describe('ServiceCodeAddComponent', () => {
  let component: ServiceCodeAddComponent;
  let fixture: ComponentFixture<ServiceCodeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCodeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
