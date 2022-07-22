import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCodeListViewComponent } from './service-code-list-view.component';

describe('ServiceCodeListViewComponent', () => {
  let component: ServiceCodeListViewComponent;
  let fixture: ComponentFixture<ServiceCodeListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCodeListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCodeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
