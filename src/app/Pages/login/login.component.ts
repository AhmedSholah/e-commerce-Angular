import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { LoaderComponent } from '../../Components/loader/loader.component';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule, CommonModule, LoaderComponent],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    loading: boolean = false;

    errorMessage = false;
    eye = 'icons/eye.svg';
    passType = 'password';
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });

    constructor(
        private auth: AuthService,
        private Router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('token');
        if (token) {
            localStorage.setItem('authToken', `${token}`);
            this.Router.navigate(['/']);
        }
    }

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
            this.loading = true;
            console.log(this.loading);
            const email = this.form.get('email')?.value || '';
            const password = this.form.get('password')?.value || '';
            this.auth.login({ email, password }).subscribe({
                next: (response) => {
                    this.Router.navigate(['/']);
                    console.log('login , successful', response);
                    this.loading = false;
                },
                error: (error) => {
                    this.errorMessage = true;
                    console.log(error);
                    this.loading = false;
                },
            });
        }
    }

    googleAuth() {
        this.auth.google().subscribe({
            next: (response) => {
                window.location.href = response;
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}

// {
//     "email": "admin@mail.com",
//     "password": "EH%Eqf^i3Q74Ht^2tHPOzqh&0goiNd"
// }
//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q1OGFlZWNjNzBkZjcxYTA4NTJjYzAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDI0ODY2MjV9.DRt25-IPgxmEdoEWdSpRORtbpko_oa0I0_t4dnrgmYw"
