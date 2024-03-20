import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartpurchaseComponent } from './cartpurchase.component';

describe('CartpurchaseComponent', () => {
  let component: CartpurchaseComponent;
  let fixture: ComponentFixture<CartpurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartpurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartpurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
