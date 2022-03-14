import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { FormListComponent } from './form-list/form-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'form-detail', component: FormDetailComponent },
  { path: 'form-list', component: FormListComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/form-detail', pathMatch: 'full'},
  { path: '**', redirectTo: '/form-detail', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
