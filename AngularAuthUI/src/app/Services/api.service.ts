import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl: string = "https://localhost:7077/api/User/";
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseApiUrl);
  }
}
