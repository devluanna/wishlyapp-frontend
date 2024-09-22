import { LoginLayoutComponent } from './login-layout.component';
import { describe, beforeEach, it, expect } from '@jest/globals'; 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

class ToastrServiceMock {
  success() {}
  error() {}
  info() {}
  warning() {}
}

describe('LoginLayoutComponent', () => {
  let component: LoginLayoutComponent;
  let fixture: ComponentFixture<LoginLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginLayoutComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock } 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); 
  });

  it('should emit onSubmit event when submit is called', () => {
    jest.spyOn(component.onSubmit, 'emit'); 
    component.submit();
    expect(component.onSubmit.emit).toHaveBeenCalled();
  });
  
  it('should emit onNavigate event when navigate is called', () => {
    jest.spyOn(component.onNavigate, 'emit'); 
    component.navigate();
    expect(component.onNavigate.emit).toHaveBeenCalled();
  });

  
  it('should open the recovery password modal', () => {
    component.openRecoveryPassword();
    expect(component.isModalOpen).toBe(true);
  });
  
  it('should close the recovery password modal', () => {
    component.openRecoveryPassword(); 
    component.closeModal();
    expect(component.isModalOpen).toBe(false);
  });
  


});

