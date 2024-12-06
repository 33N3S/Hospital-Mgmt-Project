import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashHomeComponent } from './dashboard/dash-home/dash-home.component';
import { MaterialsModule } from './materials/materials.module';
import { DashRoomsComponent } from './dashboard/dash-rooms/dash-rooms.component';
import { AddDepComponent } from './dashboard/add-dep/add-dep.component';
import { AddPatientComponent } from './dashboard/add-patient/add-patient.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientInfoComponent } from './dashboard/patient-info/patient-info.component';
import { DatePipe } from '@angular/common';
import { EditPatientComponent } from './dashboard/edit-patient/edit-patient.component';
import { RePatientComponent } from './dashboard/re-patient/re-patient.component';
import{MatAutocompleteModule} from '@angular/material/autocomplete';
import { DashActivityComponent } from './dashboard/dash-activity/dash-activity.component';
import { DashStaffComponent } from './dashboard/dash-staff/dash-staff.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DepsereviceService } from 'src/app/depserevice.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { AddDoctorComponent } from './dashboard/add-doctor/add-doctor.component';
import { AddAdminComponent } from './dashboard/add-admin/add-admin.component';
import { AddNurseComponent } from './dashboard/add-nurse/add-nurse.component';
import { EditDoctorComponent } from './dashboard/edit-doctor/edit-doctor.component';
import { EditNurseComponent } from './dashboard/edit-nurse/edit-nurse.component';
import { EditAdminComponent } from './dashboard/edit-admin/edit-admin.component';
import { EmployeeInfoComponent } from './dashboard/employee-info/employee-info.component';
import { Location } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DashDoctorComponent } from './dashboard/dash-doctor/dash-doctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrintCertComponent } from './dashboard/print-cert/print-cert.component';
import { DashGuestComponent } from './dashboard/dash-guest/dash-guest.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DashLandingComponent } from './dashboard/dash-landing/dash-landing.component';
import { CarouselSlideDirective } from 'ngx-owl-carousel-o';
import { CarouselModule as ngxcarousel } from 'ngx-bootstrap/carousel';
import { DashAboutComponent } from './dashboard/dash-about/dash-about.component';
import { DashLoginComponent } from './dashboard/dash-login/dash-login.component';
import { DashLoginAdminComponent } from './dashboard/dash-login-admin/dash-login-admin.component';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    DashHomeComponent,
    DashRoomsComponent,
    AddDepComponent,
    AddPatientComponent,
    PatientInfoComponent,
    EditPatientComponent,
    RePatientComponent,
    DashActivityComponent,
    DashStaffComponent,
    AddDoctorComponent,
    AddAdminComponent,
    AddNurseComponent,
    EditDoctorComponent,
    EditNurseComponent,
    EditAdminComponent,
    EmployeeInfoComponent,
    DashDoctorComponent,
    PrintCertComponent,
    DashGuestComponent,
    DashLandingComponent,
    DashAboutComponent,
    DashLoginComponent,
    DashLoginAdminComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    MatAutocompleteModule,
    CarouselModule,
    MatPaginatorModule,
    MatSidenavModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot() ,
    ModalModule.forRoot() ,
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot() ,
    TooltipModule.forRoot(),
    ngxcarousel.forRoot(),
    MatTabsModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
