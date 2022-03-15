import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'flexform';

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router){}

  ngOnInit(): void {
    
  }

  

}
