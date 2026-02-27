import { SlicePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe ],
  templateUrl: './product-card.html',
})
export class ProductCard {
  productService = inject(ProductsService);
  product = input.required<Product>();
  // img = signal(null);
}
