import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO: TO DEVELOPER
//       When adding new components to the RouterModule
//       make sure to import the component below and then
//       add it to the routes definition below.

import { LoginPageComponent } from './login-page/login-page.component';
import { VerifyPageComponent } from './verify-page/verify-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'verify', component: VerifyPageComponent },
  { path: 'main', component: MainPageComponent}
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
