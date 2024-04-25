import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswdComponent } from './forgotpasswd.component';

describe('ForgotpasswdComponent', () => {
  let component: ForgotpasswdComponent;
  let fixture: ComponentFixture<ForgotpasswdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotpasswdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotpasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
