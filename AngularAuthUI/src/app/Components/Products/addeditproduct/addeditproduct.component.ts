import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-addeditproduct',
  templateUrl: './addeditproduct.component.html',
  styleUrls: ['./addeditproduct.component.css']
})
export class AddeditproductComponent implements OnInit{
  isSubmit : boolean = false;
  addeditProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    created: new Date(), 
    modified: new Date(),
    modifiedBy: '',
    fileName: '',
    contentType: '',
    data: undefined
  }
  selectedFile: File | undefined;
  private editId!: number;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.editId = params['id'];
      if (this.editId != undefined) {
        this.addeditProduct.id = params['id'];
        console.log('Test ID:', this.addeditProduct.id);
        this.api.getProductById(this.addeditProduct.id).subscribe({
          next: (brands) => {
            this.addeditProduct = brands;
          },
          error: (response) => {
            this.toast.error(response, 'ERROR');
          }
        });
      }
    });
  }

  addUpdateNewProduct() {
    this.isSubmit = true;
    if (this.addeditProduct.id !== 0) {
      if (this.selectedFile !== undefined) {
        this.uploadFile();
      }
      else {
        this.EditProductWithFileupload();
      }
    }
    else {
      this.uploadFile();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if(this.addeditProduct.data !== null){
      this.addeditProduct.data = '';
    }
  }

  getImageUrl(file: File): string {
    
    return URL.createObjectURL(file);
  }

  getImageSource(): string {
    if (this.addeditProduct.id !== 0 && this.addeditProduct.data) {
      return 'data:image/png;base64,' + this.addeditProduct.data;
    } else {
      return this.selectedFile ? this.getImageUrl(this.selectedFile) : 'assets/icon-upload.png';
    }
  }

  uploadFile() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
      console.log("formdata", formData);
    }

    this.api.uploadImage(formData).subscribe(
      response => {
        this.addeditProduct.fileName = response.fileName;
        this.addeditProduct.contentType = response.contentType;
        this.addeditProduct.data = response.data;
        if (this.addeditProduct.id !== 0) {
          this.EditProductWithFileupload();
        }
        else {
          this.addProductWithFileUpload();
        }
      },
      error => {
        this.toast.error(error,"ERROR");
      }
    );
  }

  addProductWithFileUpload() {
    this.api.addProduct(this.addeditProduct).subscribe(
      {
        next: () => {
          this.toast.success("Product added successfully", 'SUCCESS');
          this.backToList();
        },
        error: (response) => {
          this.toast.error(response, 'ERROR');
        }
      }
    );
  }

  EditProductWithFileupload() {
    this.api.updateProduct(this.addeditProduct).subscribe(
      {
        next: () => {
          this.toast.error("Product updated successfully!!", 'ERROR');
          this.backToList();
        },
        error: (response) => {
          this.toast.error(response, 'ERROR');
        }
      }
    );
  }

  backToList(){
    this.router.navigate(['products'])
  }
}
