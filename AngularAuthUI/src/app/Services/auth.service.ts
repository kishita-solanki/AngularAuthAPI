import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl: string = "https://localhost:7077/api/User/";
  private userPayLoad: any
  constructor(private http: HttpClient, private router : Router) {
    this.userPayLoad = this.decodedToken();
   }

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

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayLoad)
    {
      console.log(this.userPayLoad);
      return this.userPayLoad.unique_name;
    }
      
  }

  getRoleFromToken(){
    if(this.userPayLoad)
      return this.userPayLoad.role;
  }
}
