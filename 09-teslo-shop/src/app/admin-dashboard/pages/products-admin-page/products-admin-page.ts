import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductTable } from '@products/components/product-table/product-table';
import { ProductsService } from '@products/services/products.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {
  private productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  paginationPerPage = signal(10);
  activatedRoute = inject(ActivatedRoute);
  currentPage = this.paginationService.currentPage;

  productsResource = rxResource({
    params: () => ({
      offset: this.currentPage(),
      limit: this.paginationPerPage()
    }),
    stream: ({params}) => {
      const {offset, limit} = params
      return this.productsService.getProducts({
        offset,
        limit
      });
    }
  })

  changeLimit(limit:number){
    this.paginationPerPage.update(() => limit);
  }
}
