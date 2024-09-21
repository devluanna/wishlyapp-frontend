import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalRecoveryPasswordComponent } from '../../pages/recovery-password/modal-recovery-password.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [CommonModule, ModalRecoveryPasswordComponent],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {
  @Input() title: string = "";
  @Input() quotePage: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  isModalOpen: boolean = false;

  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }

  openRecoveryPassword() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}