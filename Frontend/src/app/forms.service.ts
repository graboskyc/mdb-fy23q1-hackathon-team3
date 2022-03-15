import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import formdata from '../data/form-data-example.json';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

FormData: any = formdata;

  constructor(private http: HttpClient) { 


  }


  getFormsList(): Observable<any[]> {
    return this.http.get<any[]>(environment.formDataUrl);
  }

  getFormDefinition(): Observable<any> {
    return this.http.get<any>(environment.formDataUrl);
  }

  getFormDefinionTemp(): any {
    return this.FormData;
  }

}
