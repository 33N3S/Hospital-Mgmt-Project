import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DepsereviceService } from 'src/app/depserevice.service';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';
import { EditNurseComponent } from '../edit-nurse/edit-nurse.component';
import { EditAdminComponent } from '../edit-admin/edit-admin.component';
import { EditDoctorComponent } from '../edit-doctor/edit-doctor.component';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent {
  constructor(private dialog:MatDialogRef<EmployeeInfoComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private serv:DepsereviceService,private dialog2:MatDialog){}
  
  closeDialog(){
    this.dialog.close();
  }

  Employee=this.data.employee;
  employee=this.Employee.info;
  doctor=this.Employee.doctor;
  available=this.Employee.available;
  type=this.Employee.type;  
  deps:any;

  ngOnInit(){
    console.log(this.employee);
    this.serv.getdeps().subscribe(
      (data:any)=>{
        this.deps=data.data;
        for(let dep of data.data){
          if(dep.depNum == this.employee.depNum){
            this.employee.depNum =dep.depName;
          }
        }
      }
    )
  }

    
  editNurse(nurse:any){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="390px";
    dialogconfig.data={
      'nurse':nurse
    };
    this.dialog2.open(EditNurseComponent,dialogconfig);
  }
  editAdmin(admin:any){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="390px";
    dialogconfig.data={
      'admin':admin
    };
    this.dialog2.open(EditAdminComponent,dialogconfig);
  }
  editDoctor(doctor:any){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="542px";
    dialogconfig.data={
      'doctor':doctor
    };
    this.dialog2.open(EditDoctorComponent,dialogconfig);
  }



}
