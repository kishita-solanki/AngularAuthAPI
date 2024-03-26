import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users : any = [];
  constructor(private api : ApiService, private auth: AuthService){}

  ngOnInit(): void {
    this.api.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  onLogout(){
    this.auth.signOut();
  }
}
