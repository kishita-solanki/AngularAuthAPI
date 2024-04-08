import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Seller } from 'src/app/Models/seller.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  sellerlist: Seller[] = [];
  p: number = 1;
  itemsPerPage: number = 5;
  totalRecords: any;

  constructor(private api: ApiService, private router: Router, private toast : ToastrService) { }

  ngOnInit(): void {
    this.getSellerList();
  }

  getSellerList() {
    this.api.getAllSellers().subscribe(
      {
        next: (response) => {
          this.sellerlist = response;
          this.totalRecords = response.length;
        },
        error : (response) => {
          this.toast.error(response,"ERROR");
        }
      });
  }

  deleteSeller(id: number) {
    this.api.deleteSeller(id).subscribe({
      next: () =>{
        let currenturl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange : true}).then(() => {
          this.router.navigate([currenturl]);
        });
      }
    });
  }

  downloadFile(fileName: string) {
    this.api.sellerdownloadFile(fileName).subscribe(blob => {
      console.log(blob);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  }
}
