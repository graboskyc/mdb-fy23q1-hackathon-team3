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
import { NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportingComponent } from './reporting/reporting.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    FormDetailComponent,
    FormListComponent,
    LoginComponent,
    ReportingComponent,
    FormGeneratorComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    FontAwesomeModule
  ],
  providers: [FormsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
