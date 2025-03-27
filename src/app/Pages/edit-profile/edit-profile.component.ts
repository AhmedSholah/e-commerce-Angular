import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../Services/user-data.service';

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css'],
    imports: [CommonModule, ReactiveFormsModule],
})
export class EditProfileComponent {
    form: FormGroup;
    imagePreview: string | ArrayBuffer | null = null;
    defaultImage: string = 'person.svg';
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
        this.userService.getUser().subscribe((res) => {
            this.user = res.data.currentUser;
            this.form.patchValue(this.user);
            this.imagePreview = this.user.image ? this.user.image : this.defaultImage;
        });
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const formData = { ...this.form.value };

        Object.keys(formData).forEach((key) => {
            if (formData[key] === null || formData[key] === undefined) {
                formData[key] = '';
            }
        });

        console.log('Final Data Sent to API:', formData);

        this.userService.updateUser(formData).subscribe(
            (res) => {
                console.log('Update Successful:', res);
                this.showPopup = true;
            },
            (error) => {
                console.error('API Error:', error);
            }
        );
    }
}
