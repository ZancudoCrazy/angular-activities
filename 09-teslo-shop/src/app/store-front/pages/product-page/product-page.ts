import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { of } from 'rxjs';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  private activatedRoute = inject(ActivatedRoute );
  private productService = inject(ProductsService);

  idSlug = this.activatedRoute.snapshot.params['idSlug'];

  product = rxResource({
    params: () => ({
      idSlug: this.idSlug,
    }),
    stream: ({params}) => {
      const idSlug = params.idSlug;

      return this.productService.getProductByIdSlug( idSlug );
    }
  });
}
