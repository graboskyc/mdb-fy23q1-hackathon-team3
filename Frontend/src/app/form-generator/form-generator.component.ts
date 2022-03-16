import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.sass']
})
export class FormGeneratorComponent implements OnInit {

  createForm: FormGroup;
  section: FormArray;


  constructor(private fb: FormBuilder, private service: FormsService, private route: Router) { }

  ngOnInit(): void {

    this.section = new FormArray([this.newQuestion()]);

    this.createForm = this.fb.group({
      title: ['', Validators.required],
      section: this.section
    })
  }

  addQuestion(): void {
    this.section.push(this.newQuestion());
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      displayText: [''],
      question: ['', Validators.required],
      options: ['', [Validators.minLength(1)]]
    })
  }

  saveForm() {
    this.service.createForm(this.createForm.value);
    this.route.navigate(['/form-list']);
  }

}
