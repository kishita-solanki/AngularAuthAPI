import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  isPopupOpen = false;
  loginMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router : Router, private toast : NgToastService) { }

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
          alert(res.message);
          //  this.toast.success({detail: "Success", summary: res.message, duration: 5000});
          this.loginMessage = res.message;
          this.isPopupOpen = true;
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error:(res) =>{
          alert(res.error.message);
          //this.toast.error({detail: "ERROR", summary: res.message, duration: 5000});
        }
      })
    }
    else
    {
      ValidateForm.ValidateAllFormFields(this.loginForm);
      //alert("your from is invalid");
    }
  }
}