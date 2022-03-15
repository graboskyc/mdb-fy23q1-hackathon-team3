import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.sass']
})
export class FormListComponent implements OnInit {

  forms: Promise<any>;
  searchForm: FormGroup;

  constructor(private service: FormsService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.forms = this.service.getFormsList();
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    })
  }

  search(){
    let text = this.searchForm.get('search').value
    this.forms = this.service.formSearch(text);  
    
    
  }
  

}
