import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      })
    }
    
    // return next.handle(request).pipe(
    //   catchError((err: any) => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status === 401) {
    //         this.toast.error("Token is expired, Login again!!", 'ERROR');
    //         this.router.navigate(['login']);
    //       }
    //     }
    //     return throwError(() => new Error("Something went wrong!!"));
    //   })
    // );

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.toast.error("Token is expired, Login again!!", 'ERROR');
            this.router.navigate(['login']);
          } else if (err.status === 400) { // Assuming 400 is for bad request
            if (err.error && err.error.message) {
              // Display the error message received from the API
              this.toast.error(err.error.message, 'ERROR');
            } else {
              // If no specific message received, display a generic one
              this.toast.error("Bad request received from the server.", 'ERROR');
            }
          }
        }
        return throwError(() => new Error("Something went wrong!!"));
      })
    );
  }
}
