import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ ReactiveFormsModule ],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private authService = inject(AuthService)
  private fb = inject(FormBuilder);
  private router = inject(Router);
  hasError = signal(false);
  registerForm = this.fb.group({
    fullName: ['',Validators.required,Validators.min(5)],
    email: ['',Validators.required,Validators.email],
    password: ['',Validators.required,Validators.min(6)],

  })

  onSubmit(){
    console.log(this.registerForm.errors)
    if(this.registerForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
      return;
    }

    const { fullName, email, password} = this.registerForm.value;

    const canRegister = this.authService.register({
      fullName: fullName!, email: email!, password: password!
    });

    if(!canRegister){
      this.hasError.set(true);
      return;
    }
    this.router.navigateByUrl('/');
  }
}
