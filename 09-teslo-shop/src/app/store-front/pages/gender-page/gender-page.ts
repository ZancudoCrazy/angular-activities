import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductGenderPipe } from '@products/pipes/product-gender.pipe';
import { ProductsService } from '@products/services/products.service';
import { map, of } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from "@shared/components/pagination/pagination";

@Component({
  selector: 'app-gender-page',
  imports: [ProductGenderPipe, ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  private activeRoutes = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  paginationService = inject( PaginationService );

  gender = toSignal(
    this.activeRoutes.params.pipe(
      map(({gender}) => gender)
    )
  );

  productResource = rxResource({
    params: () => ({
      gender: this.gender(),
      offset: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) => {
      const { gender, offset } = params;
      return this.productService.getProducts({
        gender,
        offset: offset * 9,
      })
    }
  })
}
