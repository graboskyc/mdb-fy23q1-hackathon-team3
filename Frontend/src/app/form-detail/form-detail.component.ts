import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsService } from '../forms.service';
import { FormData } from '../models/form-data.model';


@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.sass']
})
export class FormDetailComponent implements OnInit {

  formData!: Promise<FormData>;
  id: string;

  constructor(private service: FormsService, private activatedRoute: ActivatedRoute) {
    
   }

  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getFormData();  
  }


  getFormData(): void {
    this.formData = this.service.getFormDefinition(this.id)
    
  }


}
