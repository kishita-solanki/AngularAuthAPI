import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);
  if(authService.isUserLoggedIn()){
    return true;
  }
  else{
    toast.error("Please login first!!", 'ERROR');
    router.navigate(['login']);
    return false;
  }
};
