import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interface/user.interface';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Kid,
  tags: [],
  images: [],
  user: {} as User
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string,Product>();

  
  getProducts( options:Options):Observable<ProductsResponse>{
    const { limit=9, offset=0, gender="" } = options;
    const key = `${limit}-${offset}-${gender}`;

    if( this.productsCache.has(key)){
      return of(this.productsCache.get(key)!);
    }

    // console.log(`${baseUrl}/products?limit=${limit}&offset=${offset}&gender=${gender}`)
    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`,
        {
          params: {
            limit,
            offset,
            gender,
          },
        }
      )
      .pipe(
        tap( response => response.products ),
        tap( response => this.productsCache.set(key, response) ),
      )
  }
  
  getProductByIdSlug(idSlug: string): Observable<Product>{
    if(this.productCache.has(idSlug))
      return of(this.productCache.get(idSlug)!);

    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        tap(console.log),
        tap(response => this.productCache.set(idSlug, response)),
      )
  }
  
  getProductBy(id: string): Observable<Product>{
    if(id === 'new')
      return of(emptyProduct)
    if(this.productCache.has(id))
      return of(this.productCache.get(id)!);

    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(
        tap(console.log),
        tap(response => this.productCache.set(id, response)),
      )
  }

  updateProduct(id: string, productLike: Partial<Product>): Observable<Product>{
    
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike)
      .pipe(
        tap((product) => this.updateProductCache(product))
      )
  }

  updateProductCache(product: Product){
    const { id } = product;

    this.productCache.set(id, product);

    this.productsCache.forEach(productResponse => {
      productResponse.products = productResponse
        .products.map( currentProduct => 
          currentProduct.id === id? product: currentProduct)
    })
  }
  
  createProduct(productLike: Partial<Product>): Observable<Product>{
    
    return this.http.post<Product>(`${baseUrl}/products`, productLike)
      .pipe(
        tap((product) => this.updateProductCache(product))
      )
  }


}
