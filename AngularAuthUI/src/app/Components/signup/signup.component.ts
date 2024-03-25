import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateform';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      username: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[a-z]"), Validators.pattern("[A-Z]"), Validators.pattern("[0-9]"), Validators.pattern("[<, >, @,!,#, $, %, ^, &, *, (,),, +,\\[,\\],{,},?,:,;,,',\\,,,,,,=]")]]
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignUp(){
    if(this.signupForm.valid){
      this.auth.signUp(this.signupForm.value).subscribe({
        next:(res) => {
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (res) => {
          alert(res.error.message)
        }
      })
    }
    else
    {
      ValidateForm.ValidateAllFormFields(this.signupForm);
      //alert("your from is invalid");
    }
  }
}
