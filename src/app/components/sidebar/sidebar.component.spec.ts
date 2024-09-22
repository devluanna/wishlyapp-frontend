import { SidebarComponent } from './sidebar.component';
import { describe, beforeEach, it, expect } from '@jest/globals'; 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

class ToastrServiceMock {
  success() {}
  error() {}
  info() {}
  warning() {}
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock } 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
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
      username: 'User',
    };
  
    const userServiceSpy = jest.spyOn(component['userService'], 'getUserInfo').mockReturnValue(of(mockUser));
  
    component.ngOnInit();
  
    expect(userServiceSpy).toHaveBeenCalledWith(userId);
    expect(component.userInitials).toBe('F L');
    expect(component.userName).toBe('User');
  });

  it('should toggle the sidebar', () => {
    expect(component.isSidebarOpen).toBe(true);
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBe(false);
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBe(true);
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
