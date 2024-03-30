import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helpers/validateform';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  resetPasswordEmail!: string;
  isValidEmail!: boolean;
  temptest = new FormControl('', [Validators.required, Validators.email]);
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService,
    private userstore: UserStoreService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      // password: ['', Validators.required]
      // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])")]]
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

    if(this.auth.isUserLoggedIn()){
      this.router.navigate(['dashboard']);
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('username',this.loginForm.value.username);
          this.loginForm.reset();
          this.auth.setToken(res.token);
          let tokenPayload = this.auth.decodedToken();
          this.userstore.setFullNameForStore(tokenPayload.unique_name);
          this.userstore.setRoleForStore(tokenPayload.role);
          this.toast.success(res.message, 'SUCCESS');
          this.router.navigate(['dashboard']);
        },
        error: (res) => {
          this.toast.error(res.error.message, 'ERROR');
        }
      })
    }
    else {
      ValidateForm.ValidateAllFormFields(this.loginForm);
    }
  }

  checkValidEmail(event : string) {
    const value = event;
    const pattern = /^\w+([-+.']\w+)*@([\w-]+\.)+[\w]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  ForgetPasswordSet(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail = "";
      const buttonref = document.getElementById("closebtn");
      buttonref?.click();
    }
  }
}
