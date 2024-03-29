import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users : any = [];
  public fullName : string = "";
  constructor(private api : ApiService, private auth: AuthService, private userstore : UserStoreService){}

  ngOnInit(): void {
    this.api.getUsers().subscribe(res => {
      this.users = res;
    });
    this.userstore.getFullNameFromStore().subscribe(val => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    })
  }
}
