import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-our-reviews',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './our-reviews.component.html',
    // styleUrl: '',
})
export class OurReviewsComponent {
    reviews = [
        {
            name: 'John Doe',
            image: 'Frame 72.png',
            rating: 4,
            review: 'I was a bit skeptical at first, but after receiving my order, I was blown away! The craftsmanship is exceptional, and the materials used are of the highest quality. I highly recommend this product to anyone looking for something unique and well-made. The customer service was also very helpful, answering all my inquiries promptly!',
        },
        {
            name: 'Jane Smith',
            image: 'Frame 72.png',
            rating: 5,
            review: 'Absolutely fantastic! From the moment I placed my order, I was impressed by the smooth process. The item arrived much earlier than expected, and the packaging was neat and secure. The attention to detail in the product design is remarkable. I have already recommended this brand to my friends and family, and I will definitely be a returning customer!',
        },
        {
            name: 'Alice Brown',
            image: 'Frame 72.png',
            rating: 3,
            review: 'The product itself is great and meets expectations in terms of quality and design. However, the shipping took longer than expected, which was a bit disappointing. If the delivery time improves, this would easily be a five-star experience. Overall, a good purchase, but be prepared for some delays if you’re ordering internationally.',
        },
        {
            name: 'Michael Johnson',
            image: 'Frame 72.png',
            rating: 5,
            review: 'I rarely leave reviews, but I had to share my experience with this purchase. The product is truly outstanding—well-crafted, durable, and stylish. It exceeded my expectations in every way. What stood out the most was the excellent customer support; they were responsive and ensured that my order was processed smoothly. I’m beyond satisfied and will definitely buy again!',
        },
    ];

    currentIndex = 0;
    touchStartX = 0;
    touchEndX = 0;

    selectReview(index: number) {
        this.currentIndex = index;
    }

    nextReview() {
        this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
    }

    prevReview() {
        this.currentIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent) {
        this.touchStartX = event.touches[0].clientX;
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent) {
        this.touchEndX = event.changedTouches[0].clientX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const deltaX = this.touchEndX - this.touchStartX;

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                this.prevReview();
            } else {
                this.nextReview();
            }
        }
    }
}
