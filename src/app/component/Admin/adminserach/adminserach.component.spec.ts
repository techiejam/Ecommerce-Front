import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminserachComponent } from './adminserach.component';

describe('AdminserachComponent', () => {
  let component: AdminserachComponent;
  let fixture: ComponentFixture<AdminserachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminserachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminserachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
