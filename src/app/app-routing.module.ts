import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashHomeComponent } from './dashboard/dash-home/dash-home.component';
import { DashRoomsComponent } from './dashboard/dash-rooms/dash-rooms.component';
import { DashActivityComponent } from './dashboard/dash-activity/dash-activity.component';
import { DashStaffComponent } from './dashboard/dash-staff/dash-staff.component';
import { DashDoctorComponent } from './dashboard/dash-doctor/dash-doctor.component';
import { DashGuestComponent } from './dashboard/dash-guest/dash-guest.component';
import { DashLandingComponent } from './dashboard/dash-landing/dash-landing.component';
import { DashAboutComponent } from './dashboard/dash-about/dash-about.component';
import { DashLoginComponent } from './dashboard/dash-login/dash-login.component';
import { DashLoginAdminComponent } from './dashboard/dash-login-admin/dash-login-admin.component';
import { PrintCertComponent } from './dashboard/print-cert/print-cert.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {component : DashHomeComponent ,path:'home'},
  {component : DashRoomsComponent,path:'rooms'},
  {component : DashActivityComponent,path:'activity'},
  {component : DashStaffComponent,path:'staff'},
  {component : DashDoctorComponent,path:'doctor'},
  {component : DashGuestComponent,path:'guest'},
  {component : DashLandingComponent,path:'land'},
  {component : DashAboutComponent,path:'about'},
  {component : DashLoginComponent,path:'login'},
  {component : DashLoginAdminComponent, path:'loginadmin'},
  {component : PrintCertComponent,path:'print'},
  {component : LoginComponent,path:''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
