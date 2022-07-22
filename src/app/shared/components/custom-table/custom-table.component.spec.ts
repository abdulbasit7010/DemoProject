import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableComponent } from './custom-table.component';
import { MatTableModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { MaterialModule } from '@app/core/modules/material/material.module';


describe('CustomTableComponent', () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTableComponent ],
      imports:[MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
