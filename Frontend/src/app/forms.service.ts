import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }


  getFormsList(): Observable<any[]> {
    return this.http.get<any[]>("Stitch URL");
  }

}
