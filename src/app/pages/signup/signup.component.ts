import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from 'src/app/components/input/input.component';
import { SignupLayoutComponent } from 'src/app/components/signup-layout-component/signup-layout.component';
import { RegisterService } from 'src/app/services/register-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { RegisterUserModel } from 'src/app/models/register-user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    SignupLayoutComponent,
    SuccessModalComponent,
    ReactiveFormsModule,
    InputComponent,
    CommonModule,
  ],
  providers: [RegisterService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  errorMessage: string = '';
  isModalOpen: boolean = false;
  registeredEmail: string = '';

  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm();
    //this.isModalOpen = true;
  }

  private registerForm(): void {
    this.form = this.formBuilder.group(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        dateBirthday: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirm_password: new FormControl('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm_password = group.get('confirm_password')?.value;
    return password === confirm_password ? null : { passwordsDoNotMatch: true };
  }

  submit() {
    if (this.form.invalid) {
      this.toastService.error("Please fill out all required fields.");
      return;
    }
    const user: RegisterUserModel = this.form.value;
    this.registerService.register(user).subscribe({
      next: (response) => {
        this.isModalOpen = true;
        this.registeredEmail = response.email;
        this.toastService.success("Registration successful!");
      },
      error: (error) => {
        this.toastService.error("Registration failed!");
        console.error(error);
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
    //this.form.reset();
    window.location.reload();
  }

  navigate() {
    this.router.navigate(['login']);
  }
}
