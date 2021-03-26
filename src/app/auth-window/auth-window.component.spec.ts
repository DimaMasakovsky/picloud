import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWindowComponent } from './auth-window.component';

describe('AuthWindowComponent', () => {
  let component: AuthWindowComponent;
  let fixture: ComponentFixture<AuthWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
