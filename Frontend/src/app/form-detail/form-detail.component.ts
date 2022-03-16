import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsService } from '../forms.service';
import { FormData } from '../models/form-data.model';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.sass']
})
export class FormDetailComponent implements OnInit {

  formData!: Promise<FormData>;
  id: string;
  faCalendar = faCalendar;

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

  saveForm(data) {
    // Go over the data and drop any null fields
    
    for (const key in data){
      if (data[key] != "") {
        let result = {formDefinitionId: this.id, answer: data[key], _pk: this.service.app.currentUser.id};
        this.service.saveFormData(result);
      }
    } 
 }


}
