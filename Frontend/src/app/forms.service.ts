import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import formdata from '../data/form-data-example.json';
import { FormData } from './models/form-data.model';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

formData: FormData = formdata;

  constructor(private http: HttpClient) { 


  }


  getFormsList(): Observable<any[]> {
    return this.http.get<any[]>(environment.formDataUrl);
  }

  getFormDefinition(): Observable<any> {
    return this.http.get<any>(environment.formDataUrl);
  }

  getFormDefinionTemp(): FormData {
    return this.formData;
  }

}
