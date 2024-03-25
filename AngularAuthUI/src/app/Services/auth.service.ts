import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl: string = "https://localhost:7077/api/User/";
  constructor(private http: HttpClient) { }

  signUp(userrequest : any){
    return this.http.post<any>(`${this.baseApiUrl}register`,userrequest);
  }

  login(userrequest : any){
    return this.http.post<any>(`${this.baseApiUrl}authenticate`,userrequest);
  }
}
