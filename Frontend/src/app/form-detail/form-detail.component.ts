import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.sass']
})
export class FormDetailComponent implements OnInit {

  formData!: Observable<any>;

  constructor(private service: FormsService) { }

  

  ngOnInit(): void {
    this.getFormData();  
  }


  getFormData(): void {
    this.formData = this.service.getFormDefinionTemp();
    console.log(this.formData);
  }


}
