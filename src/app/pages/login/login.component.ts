import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from 'src/app/components/input/input.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service';
import { ToastrService } from 'ngx-toastr';
import { identityValidator } from '../../validators/validador-indentity';
import { LoginLayoutComponent } from 'src/app/components/login-layout-component/login-layout.component';
import { ModalRecoveryPasswordComponent } from 'src/app/pages/recovery-password/modal-recovery-password.component';
import { UserService } from 'src/app/services/user-service';
import { CommonModule } from '@angular/common';

interface LoginForm {
  username: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    LoginLayoutComponent,
    ModalRecoveryPasswordComponent,
    CommonModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;
  userSubStatus: string = '';
  boxAlertClass: string = '';
  messageAlert: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService,
    private userService: UserService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, identityValidator()]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    this.loginService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (loginResponse) => {
          const userId = loginResponse.id_user;
          console.log('ID TENTANDO LOGIN' + userId);

          if (userId) {
            this.userService.getUserInfo(userId).subscribe((user) => {
              this.userSubStatus = user.subStatus;
              if (this.userSubStatus == 'BLOCKED') {
                this.setNotificationMessage();
              } else {
                this.toastService.success('Login successfully!');
                this.router.navigate(['home']);
              }
            });
          }
        },
        error: () =>
          this.toastService.error('Unexpected error! Try again later'),
      });
  }

  navigate() {
    this.router.navigate(['signup']);
  }

  private setNotificationMessage(): void {
    switch (this.userSubStatus) {
      case 'BLOCKED':
        this.messageAlert =
          'Your account is temporarily blocked, please contact support via email: support@peoplehub.com.';
        this.boxAlertClass = 'alert-red';
        break;
      default:
        break;
    }
  }
}
