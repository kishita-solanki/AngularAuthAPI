import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productlist: Product[] = [];
  p: number = 1;
  itemsPerPage: number = 5;
  totalRecords: any;

  constructor(private api: ApiService, private router: Router, private toast : ToastrService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.api.getAllProducts().subscribe(
      {
        next: (response) => {
          this.productlist = response;
          this.totalRecords = response.length;
        },
        error : (response) => {
          this.toast.error(response,"ERROR");
        }
      });
  }

  deleteBrand(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: () =>{
        let currenturl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange : true}).then(() => {
          this.router.navigate([currenturl]);
        });
      }
    });
  }

  downloadFile(fileName: string) {
    this.api.downloadFile(fileName).subscribe(blob => {
      console.log(blob);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  }
}
