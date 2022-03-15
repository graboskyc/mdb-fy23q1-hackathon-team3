import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(private service: FormsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  login(){
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;
    let user = this.service.loginUser(email, password);
    if (user != null){
      this.router.navigate(['/form-list']);
    } else {
      // Handle failed login here
    }
  }

}
