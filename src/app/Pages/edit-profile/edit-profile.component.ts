import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../Services/user-data.service';
import { LoaderComponent } from '../../Components/loader/loader.component';
import { CartComponent } from '../../Components/cart/cart.component';

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    templateUrl: './edit-profile.component.html',
    imports: [CommonModule, ReactiveFormsModule, LoaderComponent, CartComponent],
})
export class EditProfileComponent {
    loading: boolean = false;
    loadingAvatar: boolean = true;
    form: FormGroup;
    imagePreview: string | ArrayBuffer | null = null;
    defaultImage: string = 'defaultImage.jpg';
    selectedFile: File | null = null;
    showPopup: boolean = false;
    user: any = null;

    constructor(
        private fb: FormBuilder,
        private userService: UserDataService
    ) {
        this.form = this.fb.group({
            firstName: [
                '',
                [Validators.required, Validators.minLength(3), Validators.maxLength(16)],
            ],
            lastName: [
                '',
                [Validators.required, Validators.minLength(3), Validators.maxLength(16)],
            ],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
            country: ['Egypt', [Validators.required, Validators.pattern(/^Egypt$/)]],
            city: ['', Validators.required],
            bio: ['', [Validators.minLength(3), Validators.maxLength(200)]],
            image: [''],
        });

        this.loadUserData();
    }

    get f() {
        return this.form.controls;
    }

    loadUserData() {
        this.loading = true;

        this.userService.getUser().subscribe({
            next: (res) => {
                this.user = res.data.currentUser;
                this.form.patchValue(this.user);
                this.imagePreview = this.user.avatarUrl ? this.user.avatarUrl : this.defaultImage;
                this.loading = false;
                this.loadingAvatar = false;
            },
            error: (error) => {
                console.error('Error loading user data:', error);
                this.loading = false;
                this.loadingAvatar = false;
            },
        });
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;
        this.loadingAvatar = true;

        this.userService.changeUserAvatar(file).subscribe({
            next: (res) => {
                this.imagePreview = URL.createObjectURL(file);
                this.selectedFile = file;
                console.log('Image Upload Successful:', res);
                this.loadingAvatar = false;
            },
            error: (error) => {
                console.error('Image Upload Error:', error);
                this.loadingAvatar = false;
            },
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;
        const formData = { ...this.form.value };

        Object.keys(formData).forEach((key) => {
            if (formData[key] === null || formData[key] === undefined) {
                formData[key] = '';
            }
        });

        console.log('Final Data Sent to API:', formData);

        this.userService.updateUser(formData).subscribe({
            next: (res) => {
                console.log('Update Successful:', res);
                this.showPopup = true;
                this.loading = false;
            },
            error: (error) => {
                console.error('API Error:', error);
                this.loading = false;
            },
        });
    }
}
