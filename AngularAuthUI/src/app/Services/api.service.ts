import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl: string = "https://localhost:7077";
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseApiUrl + '/api/User/');
  }

  getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Product/product-list');
  }

  addProduct(newProduct: Product): Observable<Product> {
    newProduct.id = 0;
    newProduct.created = new Date();
    return this.http.post<Product>(this.baseApiUrl + '/api/Product/add-product', newProduct);
  }

  getProductById(productid: number): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + '/api/Product/' + productid);
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    updatedProduct.modified = new Date();
    const user = localStorage.getItem('username');
    updatedProduct.modifiedBy = user !== null ? user : '';
    return this.http.put<Product>(`${this.baseApiUrl}/api/Product/${updatedProduct.id}`, updatedProduct);
  }

  deleteProduct(deleteProductId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/api/Product/${deleteProductId}`);
  }

  uploadImage(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + '/api/FileUpload/upload', formData)
  }

  downloadFile(fileName: string) {
    return this.http.get(`${this.baseApiUrl}/api/FileUpload/download/${fileName}`, { responseType: 'blob' });
  }
}
