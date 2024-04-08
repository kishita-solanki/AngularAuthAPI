import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product.model';
import { Seller } from '../Models/seller.model';
import { Client } from '../Models/client.model';

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

  sellerdownloadFile(fileName: string) {
    return this.http.get(`${this.baseApiUrl}/api/FileUpload/sellerfiledownload/${fileName}`, { responseType: 'blob' });
  }

  getAllSellers() : Observable<Seller[]>{
    return this.http.get<Seller[]>(this.baseApiUrl + '/api/Seller/seller-list');
  }

  addSeller(newSeller: Seller): Observable<Seller> {
    newSeller.id = 0;
    newSeller.created = new Date();
    return this.http.post<Seller>(this.baseApiUrl + '/api/Seller/add-seller', newSeller);
  }

  getSellerById(sellerid: number): Observable<Seller> {
    return this.http.get<Seller>(this.baseApiUrl + '/api/Seller/' + sellerid);
  }

  updateSeller(updatedseller: Seller): Observable<Seller> {
    updatedseller.modified = new Date();
    const user = localStorage.getItem('username');
    updatedseller.modifiedBy = user !== null ? user : '';
    return this.http.put<Seller>(`${this.baseApiUrl}/api/Seller/${updatedseller.id}`, updatedseller);
  }

  deleteSeller(deleteSellerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/api/Seller/${deleteSellerId}`);
  }

  getAllClients() : Observable<Client[]>{
    return this.http.get<Client[]>(this.baseApiUrl + '/api/Client/client-list');
  }

  addClient(newClient: Client): Observable<Client> {
    newClient.id = 0;
    newClient.created = new Date();
    return this.http.post<Client>(this.baseApiUrl + '/api/Client/add-client', newClient);
  }

  getClientById(clientid: number): Observable<Client> {
    return this.http.get<Client>(this.baseApiUrl + '/api/Client/' + clientid);
  }

  updateClient(updatedClient: Client): Observable<Client> {
    updatedClient.modified = new Date();
    const user = localStorage.getItem('username');
    updatedClient.modifiedBy = user !== null ? user : '';
    return this.http.put<Client>(`${this.baseApiUrl}/api/Client/${updatedClient.id}`, updatedClient);
  }

  deleteClient(deleteClientId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/api/Client/${deleteClientId}`);
  }
}
