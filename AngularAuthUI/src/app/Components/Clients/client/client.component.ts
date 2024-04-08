import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/Models/client.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientlist: Client[] = [];
  p: number = 1;
  itemsPerPage: number = 5;
  totalRecords: any;
  userTimezone: string = '';

  constructor(private api: ApiService, private router: Router, private toast : ToastrService) { }

  ngOnInit(): void {
    this.userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Usertimezone",this.userTimezone);
    this.getClientList();
  }

  getLocalTime(date: Date): string {
    return moment.utc(date).tz(this.userTimezone).format('DD-MM-YYYY HH:mm:ss');
  }

  getClientList() {
    this.api.getAllClients().subscribe(
      {
        next: (response) => {
          this.clientlist = response;
          this.totalRecords = response.length;
        },
        error : (response) => {
          this.toast.error(response,"ERROR");
        }
      });
  }

  deleteClient(id: number) {
    this.api.deleteClient(id).subscribe({
      next: () =>{
        let currenturl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange : true}).then(() => {
          this.router.navigate([currenturl]);
        });
      }
    });
  }
}
