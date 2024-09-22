import { NavbarComponent } from './navbar.component';
import { describe, beforeEach, it,  expect } from '@jest/globals'; 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { LoginComponent } from 'src/app/pages/login/login.component';

class ToastrServiceMock {
  success() {}
  error() {}
  info() {}
  warning() {}
}


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }, 
          { path: '**', redirectTo: 'login' }
        ]),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock } 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); 
  });

  it('should fetch user info and set user properties', () => {
    const userId = '123';
    sessionStorage.setItem('userId', userId);
    
    const mockUser = {
      first_name: 'First',
      last_name: 'Last',
      role: 'User',
      status: 'Active',
      subStatus: 'UNLOCKED'
    };
  
    const userServiceSpy = jest.spyOn(component['userService'], 'getUserInfo').mockReturnValue(of(mockUser));
  
    component.ngOnInit();
  
    expect(userServiceSpy).toHaveBeenCalledWith(userId);
    expect(component.userInitials).toBe('F L');
    expect(component.userRole).toBe('User');
    expect(component.userStatus).toBe('Active');
    expect(component.userSubStatus).toBe('UNLOCKED');
  });
  
  it('should toggle the settings menu', () => {
    expect(component.isSubMenuOpen).toBe(false);
    component.toggleSettingsMenu();
    expect(component.isSubMenuOpen).toBe(true);
    component.toggleSettingsMenu();
    expect(component.isSubMenuOpen).toBe(false);
  });

  it('should toggle the notification menu', () => {
    expect(component.isNotificationOpen).toBe(false);
    component.toggleNotification();
    expect(component.isNotificationOpen).toBe(true);
    component.toggleNotification();
    expect(component.isNotificationOpen).toBe(false);
  });

  it('should call logout service on logout', () => {
    const logoutServiceSpy = jest.spyOn(component['logoutService'], 'logout');
    component.logout();
    expect(logoutServiceSpy).toHaveBeenCalled();
  });
  
  it('should call toggleNotification when notification icon is clicked', () => {
    const notificationIcon = fixture.nativeElement.querySelector('.notification-icon');
    notificationIcon.click();
    fixture.detectChanges();
    expect(component.isNotificationOpen).toBe(true);
  });
  
  it('should call logout when logout icon is clicked', () => {
    const logoutIcon = fixture.nativeElement.querySelector('.icon-logout img');
    const logoutSpy = jest.spyOn(component, 'logout');
    logoutIcon.click();
    fixture.detectChanges();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should handle error when fetching user info', () => {
    const userId = '123';
    sessionStorage.setItem('userId', userId);
  
    const userServiceSpy = jest.spyOn(component['userService'], 'getUserInfo').mockReturnValueOnce(throwError(() => new Error('User not found')));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    component.ngOnInit();
  
    expect(userServiceSpy).toHaveBeenCalledWith(userId);
    expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter informações do usuário', expect.any(Error));
  
    consoleSpy.mockRestore(); 
  });
  

});

