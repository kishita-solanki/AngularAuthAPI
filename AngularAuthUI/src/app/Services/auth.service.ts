import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl: string = "https://localhost:7077/api/User/";
  constructor(private http: HttpClient, private router : Router) { }

  signUp(userrequest : any){
    return this.http.post<any>(`${this.baseApiUrl}register`,userrequest);
  }

  login(userrequest : any){
    return this.http.post<any>(`${this.baseApiUrl}authenticate`,userrequest);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  setToken(tokenvalue : string){
    localStorage.setItem('token',tokenvalue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isUserLoggedIn() : boolean{
    return !!localStorage.getItem('token');
  }
}
