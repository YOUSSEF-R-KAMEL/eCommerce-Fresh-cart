import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products/products.service';
import { IProduct } from '../../shared/models/IProducts';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productId: string  = '';
  product: IProduct | null = null;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(private _productsService:ProductsService , private route: ActivatedRoute) {}
  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getProductById()
  }

  getProductById() {
    if (this.productId){
      this._productsService.getProductById(this.productId).subscribe({
        next: (res) => {
          this.product = res.data
        },
        error: (err) => {
          console.log('Error fetching product:', err);
        }
      });
    }
  }
}
