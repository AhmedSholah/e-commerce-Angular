import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LoaderComponent } from '../../Components/loader/loader.component';

@Component({
    selector: 'app-register',
    imports: [RouterLink, CommonModule, ReactiveFormsModule,LoaderComponent],
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    eye = 'icons/eye.svg';
    passType = 'password';
    submitClicked = false;
    passwordCheck = false;
    samePassword = true;
    userExists = false;
    loading = false;
    constructor(
        private auth: AuthService,
        private Router: Router
    ) {}

    form = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(9)]),
        confirmPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(256),
        ]),
        gender: new FormControl('', [Validators.required]),
    });

    get firstName() {
        return this.form.get('firstName');
    }
      get lastName() {
        return this.form.get('lastName');
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
    get gender() {
        return this.form.get('gender');
    }

    validatePassword() {
        const value = this.password?.value || '';
        const pattern = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
        return pattern.test(value);
    }
    matchedPassword() {
        const pass1 = this.password?.value || '';
        const pass2 = this.confirmPassword?.value || '';
        return pass1 !== pass2 ? false : true;
    }
    onSubmit() {
        this.submitClicked = true;
        const firstName = this.firstName?.value || '';
        const lastName = this.firstName?.value || '';
        const email = this.email?.value || '';
        const password = this.password?.value || '';
        const gender = this.gender?.value || '';
        const role = 'client';

        console.log('passwordCheck', this.matchedPassword());
        console.log(this.matchedPassword());
        console.log({ firstName, lastName, email, gender, password, role });
        this.passwordCheck = this.validatePassword();
        this.samePassword = this.matchedPassword();

        if (this.passwordCheck && this.samePassword) {
            if (this.form.valid) {
                this.loading = true;
                this.auth.register({ firstName, lastName, email, gender, password, role }).subscribe({
                    next: (response) => {
                        this.Router.navigate(['/login']);
                    },
                    error: (error) => {
                        if (error.error.message === 'User Already Exists') {
                            this.userExists = true;
                            this.loading = false;
                        }
                        console.log(error.error.message);
                    },
                });
            }
        }
    }

    changIcon() {
        this.passType = this.passType == 'password' ? 'text' : 'password';
        this.eye = this.eye == 'icons/eye.svg' ? 'icons/hideEye.svg' : 'icons/eye.svg';
    }
}