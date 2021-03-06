import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { FormListComponent } from './form-list/form-list.component';
import { LoginComponent } from './login/login.component';
import { ReportingComponent } from './reporting/reporting.component';

const routes: Routes = [
  { path: 'form-detail', component: FormDetailComponent },
  { path: 'form-list', component: FormListComponent },
  { path: 'form-create', component: FormGeneratorComponent },
  { path: 'responses', component: ReportingComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/form-list', pathMatch: 'full'},
  { path: '**', redirectTo: '/form-list', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
