import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.sass']
})
export class FormGeneratorComponent implements OnInit {

  createForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.createForm = this.fb.group({
      title: ['', Validators.required],
      section: this.fb.array([this.newQuestion()])
    })

  }

  addQuestion(): void {
    this.section().push(this.newQuestion());
  }

  section(): FormArray {
    return this.createForm.get('section') as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      displayText: [''],
      question: ['', Validators.required],
      options: ['', [Validators.minLength(1)]]
    })
  }

  saveForm(): void {

  }

}
