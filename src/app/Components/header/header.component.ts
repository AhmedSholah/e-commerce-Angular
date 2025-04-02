import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CartServiceService } from '../../Services/cart-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { UserDataService } from '../../Services/user-data.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    isLoggedIn = false;
    userName: string = '';
    userImage: string = 'defaultImage.jpg';
    dropdownOpen = false;

    constructor(
        private cartService: CartServiceService,
        private router: Router,
        private authService: AuthService,
        private userDataService: UserDataService,
        private eRef: ElementRef
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.dropdownOpen = false;
            }
        });
    }

    ngOnInit() {
        this.userDataService.getUser().subscribe({
            next: (response) => {
                const user = response.data.currentUser;
                if (user) {
                    this.isLoggedIn = true;
                    this.userName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
                    this.userImage = user.image || 'defaultImage.jpg';
                }
            },
            error: (err) => {
                console.error('Error fetching user data:', err);
            },
        });
    }

    toggleCart(event: Event) {
        event.preventDefault();
        this.cartService.toggleCart();
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
        if (this.dropdownOpen) {
            this.fetchUserData();
        }
    }

    fetchUserData() {
        this.userDataService.getUser().subscribe({
            next: (response) => {
                const user = response.data.currentUser;
                if (user) {
                    this.userName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
                    this.userImage = user.image || 'defaultImage.jpg';
                }
            },
            error: (err) => {
                console.error('Error fetching user data:', err);
            },
        });
    }

    @HostListener('document:click', ['$event'])
    clickOutside(event: Event) {
        if (this.dropdownOpen && !this.eRef.nativeElement.contains(event.target)) {
            this.dropdownOpen = false;
        }
    }

    logout() {
        this.authService.logout();
        this.isLoggedIn = false;
        this.dropdownOpen = false;
    }

    get firstName(): string {
        return this.userName.split(' ')[0] || '';
    }

    get lastName(): string {
        return this.userName.split(' ')[1] || '';
    }
    navigateToSection(sectionId: string) {
        if (this.router.url === '/') {
          
          this.scrollToSection(sectionId);
        } else {
          
          this.router.navigate(['/']).then(() => {
            setTimeout(() => this.scrollToSection(sectionId), 100); 
          });
        }
      }
    scrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
}
