import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helpers/validateform';
import { Seller } from 'src/app/Models/seller.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-addeditseller',
  templateUrl: './addeditseller.component.html',
  styleUrls: ['./addeditseller.component.css']
})
export class AddeditsellerComponent implements OnInit {
  sellerForm!: FormGroup
  selectedFile: File | undefined;
  private editId!: number;
  addeditSeller: Seller = {
    id: 0,
    name: '',
    address: '',
    email: '',
    mobileNo: '',
    created: new Date(), 
    modified: new Date(),
    modifiedBy: '',
    fileName: '',
    contentType: '',
    data: undefined
  }

  constructor(private fb:FormBuilder,private api: ApiService, private router: Router, private route: ActivatedRoute, private toast: ToastrService) {}

  ngOnInit(): void {
    this.sellerForm = this.fb.group({
      name: ['',Validators.required],
      address: ['',Validators.required],
      email: ['', Validators.required],
      mobilenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      sellerimage: ['',Validators.required]
    })

    this.route.params.subscribe(params => {
      this.editId = params['id'];
      if (this.editId != undefined) {
        this.addeditSeller.id = params['id'];
        console.log('Test ID:', this.addeditSeller.id);
        this.api.getSellerById(this.addeditSeller.id).subscribe({
          next: (response) => {
            this.addeditSeller = response;
          },
          error: (response) => {
            this.toast.error(response, 'ERROR');
          }
        });
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if(this.addeditSeller.data !== null){
      this.addeditSeller.data = '';
    }
  }

  getImageUrl(file: File): string {
    
    return URL.createObjectURL(file);
  }

  getImageSource(): string {
    if (this.addeditSeller.id !== 0 && this.addeditSeller.data) {
      return 'data:image/png;base64,' + this.addeditSeller.data;
    } else {
      return this.selectedFile ? this.getImageUrl(this.selectedFile) : 'assets/icon-upload.png';
    }
  }

  AddUpdateNewSeller(){
    console.log(this.addeditSeller);
    if(this.sellerForm.valid){
      if (this.addeditSeller.id !== 0) {
        if (this.selectedFile !== undefined) {
          this.uploadFile();
        }
        else {
          this.EditSellerWithFileupload();
        }
      }
      else {
        this.uploadFile();
      }
    }
    else{
      ValidateForm.ValidateAllFormFields(this.sellerForm);
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
        this.addeditSeller.fileName = response.fileName;
        this.addeditSeller.contentType = response.contentType;
        this.addeditSeller.data = response.data;
        if (this.addeditSeller.id !== 0) {
          this.EditSellerWithFileupload();
        }
        else {
          this.addSellerWithFileUpload();
        }
      },
      error => {
        this.toast.error(error,"ERROR");
      }
    );
  }

  addSellerWithFileUpload() {
    this.api.addSeller(this.addeditSeller).subscribe(
      {
        next: () => {
          this.backToList();
          this.toast.success("Seller added successfully", 'SUCCESS');
        },
        error: (response) => {
          this.toast.error(response, 'ERROR');
        }
      }
    );
  }

  EditSellerWithFileupload() {
    this.api.updateSeller(this.addeditSeller).subscribe(
      {
        next: () => {
          this.toast.success("Seller updated successfully!!", 'SUCCESS');
          this.backToList();
        },
        error: (response) => {
          this.toast.error(response, 'ERROR');
        }
      }
    );
  }

  backToList(){
    this.router.navigate(['sellers'])
  }
}
