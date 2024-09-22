import { describe, beforeEach, it, expect } from '@jest/globals'; 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalRecoveryPasswordComponent } from './modal-recovery-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

class ToastrServiceMock {
  success() {}
  error() {}
  info() {}
  warning() {}
}

describe('ModalRecoveryPasswordComponent', () => {
  let component: ModalRecoveryPasswordComponent;
  let fixture: ComponentFixture<ModalRecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalRecoveryPasswordComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock } // Mock do ToastrService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); 
  });

  it('should close the modal and emit onCloseModal', () => {
    const emitSpy = jest.spyOn(component.onCloseModal, 'emit'); 
    component.isModalOpen = true; 
    component.closeModal();

    expect(component.isModalOpen).toBe(true); 
    expect(emitSpy).toHaveBeenCalled(); 
  });

});
