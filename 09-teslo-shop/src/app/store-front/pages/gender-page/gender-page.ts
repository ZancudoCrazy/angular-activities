import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductGenderPipe } from '@products/pipes/product-gender.pipe';
import { ProductsService } from '@products/services/products.service';
import { map, of } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";

@Component({
  selector: 'app-gender-page',
  imports: [ProductGenderPipe, ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  private activeRoutes = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  gender = toSignal(
    this.activeRoutes.params.pipe(
      map(({gender}) => gender)
    )
  );

  productResource = rxResource({
    params: () => ({
      gender: this.gender()
    }),
    stream: ({ params }) => {
      const { gender } = params;
      if(!gender) return of([]);
      return this.productService.getProducts({
        gender
      })
    }
  })
}
