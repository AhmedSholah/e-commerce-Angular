import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
    selector: 'app-register',
    imports: [RouterLink, CommonModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    eye = 'icons/eye.svg';
    passType = 'password';

    constructor(private auth: AuthService, private Router: Router){}

    form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(9)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });

    get name() {
        return this.form.get('name');
    }
    get email() {
        return this.form.get('email');
    }
    get password() {
        return this.form.get('password');
    }
    get confirmPassword() {
        return this.form.get('confirmPassword');
    }


    onSubmit(){
        const name = this.form.get('name')?.value || '';
        const email = this.form.get('email')?.value|| '';
        const password = this.form.get('password')?.value || '';

            this.auth.register({name, email , password }).subscribe({
                next: (response) =>{
        
                }, 
                error: (error) => {
        
                }
            });

    }

    
    changIcon() {
        this.passType = this.passType == 'password' ? 'text' : 'password';
        this.eye = this.eye == 'icons/eye.svg' ? 'icons/hideEye.svg' : 'icons/eye.svg';
    }
    
}
