import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

// TODO: TO DEVELOPER
//       When adding new components to the RouterModule
//       make sure to import the component below and then
//       add it to the routes definition below.

import { CameraPageComponent } from './camera-page/camera-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { VerifyPageComponent } from './verify-page/verify-page.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "camera", component: CameraPageComponent, canActivate: [AuthGuard] },
  { path: "dash", component: DashboardPageComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginPageComponent },
  { path: "verify", component: VerifyPageComponent, canActivate: [AuthGuard] },
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
