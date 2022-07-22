import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceCodeViewComponent } from './sub-service-code-view.component';

describe('SubServiceCodeViewComponent', () => {
  let component: SubServiceCodeViewComponent;
  let fixture: ComponentFixture<SubServiceCodeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubServiceCodeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubServiceCodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
