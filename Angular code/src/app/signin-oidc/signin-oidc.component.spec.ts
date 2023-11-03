import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninOidcComponent } from './signin-oidc.component';

describe('SigninOidcComponent', () => {
  let component: SigninOidcComponent;
  let fixture: ComponentFixture<SigninOidcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninOidcComponent]
    });
    fixture = TestBed.createComponent(SigninOidcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
