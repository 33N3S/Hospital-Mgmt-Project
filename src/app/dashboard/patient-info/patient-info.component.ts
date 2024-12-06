import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { patient } from 'src/app/hospital';
import { MatDialogConfig } from '@angular/material/dialog';
import { DepsereviceService } from 'src/app/depserevice.service';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent {
  constructor(private dialog:MatDialogRef<PatientInfoComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private serv:DepsereviceService,private dialog2:MatDialog){}
  
  closeDialog(){
    this.dialog.close();
  }

  p=this.data.patient;
  dep=this.data.dep;
  doc=this.data.doc;
  
  depName=this.data.depName;
  ngOnInit(){
  }

  openEdit(){
    this.dialog.close();
    const config2=new MatDialogConfig();
    config2.disableClose=true;
    config2.autoFocus=true;
    config2.width="600px";
    config2.height="554px";
    config2.data = {
          patient:this.p,
          depName:this.depName
    };
        this.dialog2.open(EditPatientComponent,config2);
      }
 


  
}
