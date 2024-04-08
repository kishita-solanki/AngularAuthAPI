import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helpers/validateform';
import { Client } from 'src/app/Models/client.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-addeditclient',
  templateUrl: './addeditclient.component.html',
  styleUrls: ['./addeditclient.component.css']
})
export class AddeditclientComponent implements OnInit {
  clientForm!: FormGroup
  private editId!: number;
  addeditClient: Client = {
    id: 0,
    name: '',
    address: '',
    email: '',
    mobileNo: '',
    created: new Date(), 
    modified: new Date(),
    modifiedBy: ''
  }

  constructor(private fb:FormBuilder,private api: ApiService, private router: Router, private route: ActivatedRoute, private toast: ToastrService) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['',Validators.required],
      address: ['',Validators.required],
      email: ['', Validators.required],
      mobilenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    })

    this.route.params.subscribe(params => {
      this.editId = params['id'];
      if (this.editId != undefined) {
        this.addeditClient.id = params['id'];
        console.log('Test ID:', this.addeditClient.id);
        this.api.getClientById(this.addeditClient.id).subscribe({
          next: (response) => {
            this.addeditClient = response;
          },
          error: (response) => {
            this.toast.error(response, 'ERROR');
          }
        });
      }
    });
  }

  AddUpdateNewSeller(){
    console.log(this.addeditClient);
    if(this.clientForm.valid){
      if (this.addeditClient.id !== 0) {
          this.EditClientWithFileupload();
      }
      else {
        this.addClientWithFileUpload();
      }
    }
    else{
      ValidateForm.ValidateAllFormFields(this.clientForm);
    }
  }

  addClientWithFileUpload() {
    this.api.addClient(this.addeditClient).subscribe(
      {
        next: () => {
          this.toast.success("Client added successfully", 'SUCCESS');
          this.backToList();
        },
        error: (response) => {
          this.toast.error(response, 'ERROR');
        }
      }
    );
  }

  EditClientWithFileupload() {
    this.api.updateClient(this.addeditClient).subscribe(
      {
        next: () => {
          this.toast.success("Client updated successfully!!", 'SUCCESS');
          this.backToList();
        },
        error: (response) => {
          this.toast.error(response, 'ERROR');
        }
      }
    );
  }

  backToList(){
    this.router.navigate(['clients'])
  }
}
