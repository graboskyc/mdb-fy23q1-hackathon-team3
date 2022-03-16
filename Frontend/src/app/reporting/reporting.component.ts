import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.sass']
})
export class ReportingComponent implements OnInit {

  responses: Promise<any>;
  facets: Promise<any>;
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private service: FormsService) { }

  
  ngOnInit(): void {

    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    })

    this.responses = this.service.responseSearch();
    this.facets = this.service.facetSearch();
  }

  search(){
    let text = this.searchForm.get('search').value
    this.responses = this.service.responseSearch(text);  
    this.facets = this.service.facetSearch(text);  
    
    
  }
  

}
