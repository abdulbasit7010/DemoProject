import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMatTreeViewComponent } from './menu-mat-tree-view.component';

describe('MenuMatTreeViewComponent', () => {
  let component: MenuMatTreeViewComponent;
  let fixture: ComponentFixture<MenuMatTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMatTreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMatTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
