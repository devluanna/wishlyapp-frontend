import { LoginComponent } from './login.component';
import { describe, beforeEach, it, expect, jest } from '@jest/globals'; 
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { LoginService } from 'src/app/services/login-service';
import { UserService } from 'src/app/services/user-service';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/types/login-response.type';

class ToastrServiceMock {
  success = jest.fn();
  error = jest.fn();
}

class LoginServiceMock {
  login = jest.fn();
}

class UserServiceMock {
  getUserInfo = jest.fn();
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginServiceMock;
  let userService: UserServiceMock;
  let toastService: ToastrServiceMock;
  let router: Router;

  beforeEach(async () => {
    loginService = new LoginServiceMock();
    userService = new UserServiceMock();
    toastService = new ToastrServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterTestingModule.withRoutes([]), 
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ToastrService, useValue: toastService },
        { provide: LoginService, useValue: loginService },
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate'); 

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); 
  });

  it('should login successfully for an existing user', () => {
    const mockLoginResponse = { id_user: '123' }; 
    const mockUserResponse = { subStatus: 'ACTIVE', username: 'testuser' }; 
  
    loginService.login.mockReturnValue(of(mockLoginResponse));
    userService.getUserInfo.mockReturnValue(of(mockUserResponse));
  
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('password123');
    
    component.submit();
  
    fixture.whenStable().then(() => {
      expect(loginService.login).toHaveBeenCalledWith('testuser', 'password123'); 
      expect(userService.getUserInfo).toHaveBeenCalledWith('123');
      expect(component.messageAlert).toBeUndefined(); 
      expect(component.boxAlertClass).toBeUndefined();
    });
  })

 
  
});
