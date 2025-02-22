import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-panel/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { UserComponent } from './user-panel/user/user.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'user', component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
