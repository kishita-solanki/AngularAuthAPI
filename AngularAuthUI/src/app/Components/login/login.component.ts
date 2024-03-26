import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helpers/validateform';
import { AuthService } from 'src/app/Services/auth.service';

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

  constructor(private fb: FormBuilder, private auth: AuthService, private router : Router, private toast : ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      // password: ['', Validators.required]
      // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])")]]
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next:(res) =>{
          this.loginForm.reset();
          this.auth.setToken(res.token);
          this.toast.success(res.message, 'SUCCESS');
          this.router.navigate(['dashboard']);
        },
        error:(res) =>{
          console.log(res);
          this.toast.error(res.error.message, 'ERROR');
        }
      })
    }
    else
    {
      ValidateForm.ValidateAllFormFields(this.loginForm);
    }
  }
}