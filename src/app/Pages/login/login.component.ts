import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
   
    
    errorMessage = false;
    eye = 'icons/eye.svg';
    passType = 'password';
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });
    
    constructor(private auth: AuthService, private Router: Router) {}


    get email() {
        return this.form.get('email');
    }
    get password() {
        return this.form.get('password');
    }

    changIcon() {
        this.passType = this.passType == 'password' ? 'text' : 'password';
        this.eye = this.eye == 'icons/eye.svg' ? 'icons/hideEye.svg' : 'icons/eye.svg';
    }

    onSubmit() {
        if (this.form.valid) {
            const email = this.form.get('email')?.value || '';
            const password = this.form.get('password')?.value || '';
            this.auth.login({email, password}).subscribe({
                next: (response) => {
                    this.Router.navigate(['/home']);
                    console.log('login , successful', response);   
                },
                error: (error) => {
                    this.errorMessage = true;
                    console.log(error);
                    
                }
            },
        )
    }   
}
}

// {
//     "email": "admin@mail.com",
//     "password": "EH%Eqf^i3Q74Ht^2tHPOzqh&0goiNd"
// }
