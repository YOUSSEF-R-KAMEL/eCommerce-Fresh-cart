import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products/products.service';
import { IProduct } from '../../shared/models/IProducts';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../shared/services/categories/categories.service';
import { ICategory } from '../../shared/models/ICategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  productsList:IProduct[] = []
  CategoriesList:ICategory[] = []
  getAllProductSubscribe!:Subscription
  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    // navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      991: {
        items: 4
      },
      1200: {
        items: 6
      }
    },
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    smartSpeed: 1500,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   400: {
    //     items: 2
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 4
    //   }
    // },
    nav: true
  }
  constructor(private _productsService:ProductsService,
              private _categoriesService:CategoriesService,
            ) {}
  ngOnInit(): void {
    this.getAllProducts()
    this.getAllCategories()
  }
  getAllProducts(){
    this.getAllProductSubscribe = this._productsService.getAllProducts(12).subscribe({
      next: (res) => {
        this.productsList = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getAllCategories(){
    this.getAllProductSubscribe = this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.CategoriesList = res.data
        console.log(this.CategoriesList);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  ngOnDestroy(){
    this.getAllProductSubscribe?.unsubscribe()
  }
}
