import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { LoginUser } from 'src/app/models/login-user.mode';

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
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;
  userSubStatus: string = '';
  boxAlertClass: string = '';
  messageAlert: string = '';
  public form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
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
  ngOnInit(): void {
    this.formLogin();
  }

  private formLogin(): void {
    this.form = this.formBuilder.group(
      {
        username: new FormControl('', [Validators.required, identityValidator()]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
    );
  }

  submit() {
    if (this.form.invalid) {
      this.toastService.error("Please fill out all required fields.");
      return;
    }
    const user: LoginUser = this.form.value;
    this.loginService.login(user)
    .subscribe({
      next: (loginResponse) => {
        const userId = loginResponse.id_user;
        console.log('ID TENTANDO LOGIN' + userId);

        if (userId) {
          this.userService.getUserInfo(userId).subscribe((user) => {
            this.userSubStatus = user.subStatus;
            if (this.userSubStatus == 'ACTIVATED') {
              this.setNotificationMessage();
            } else {
              this.toastService.success('Login successfully!');
              this.router.navigate(['home']);
            }
          });
        }
      },
      error: (error) => {
        this.toastService.error("Registration failed!");
        console.error(error);
      }
    });
  }

  navigate() {
    this.router.navigate(['signup']);
  }

  private setNotificationMessage(): void {
    switch (this.userSubStatus) {
      case 'ACTIVATED':
        this.messageAlert =
          'Your account is temporarily INACTIVE, to activate it click on "Activate your account", enter your email and follow the instructions.';
        this.boxAlertClass = 'alert-red';
        break;
      default:
        break;
    }
  }
}
