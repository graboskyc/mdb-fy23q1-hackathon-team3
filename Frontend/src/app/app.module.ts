import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormsService } from './forms.service';
import { LoginComponent } from './login/login.component';
import { NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FormDetailComponent,
    FormListComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbNavModule,
    NgbDropdownModule
  ],
  providers: [FormsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
