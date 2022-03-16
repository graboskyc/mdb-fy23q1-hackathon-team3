import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Realm from "realm-web";

import { FormData } from './models/form-data.model';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

formData: FormData;
APP_ID = environment.app_id;
graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${this.APP_ID}/graphql`;

// Connect to your MongoDB Realm app
app: Realm.App


  constructor(private http: HttpClient) { 
    this.app = new Realm.App(this.APP_ID);
  }


  getFormsList(): Promise<any[]> {
    return this.app.currentUser.callFunction('form_all');
  }

  formSearch(text: string): Promise<any[]> {
    return this.app.currentUser.callFunction('form_search', text);
  }

  saveFormData(data: object){
    return this.app.currentUser.callFunction('form_save', data);
  }

  getFormDefinition(id: string): Promise<FormData> {
    return  this.app.currentUser.callFunction<FormData>('form_get', id);
  }


  loginUser(email: string, password: string): any {
    let credentials = Realm.Credentials.emailPassword(email, password);
    try {
      let user = this.app.logIn(credentials);
      return this.app.currentUser;
    } catch (err) {
      console.error('Something failed');
      return null;
    }
  }


  // Get a valid Realm user access token to authenticate requests
  async getValidAccessToken(): Promise<string> {
    if (!this.app.currentUser)
      // If no user is logged in, log in an anonymous user
      await this.app.logIn(Realm.Credentials.anonymous());
    else
      // The logged in user's access token might be stale,
      // Refreshing custom data also refreshes the access token
      await this.app.currentUser.refreshCustomData();

    // Get a valid access token for the current user
    localStorage.setItem('token', this.app.currentUser.accessToken);
    console.log(this.app.currentUser);
    return this.app.currentUser.accessToken;
  }



}
