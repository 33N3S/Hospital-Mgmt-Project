import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms';
import { DepsereviceService } from 'src/app/depserevice.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent {
  patientform:any;
  numbed:any;
  currdate:Date;
  empties:any;

  constructor(private dialog:MatDialogRef<EditPatientComponent>,private fb:FormBuilder,private serv:DepsereviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,private snack:MatSnackBar, private datePipe: DatePipe){
    
    this.currdate=new Date();

    this.patientform=fb.group({
      cinPatient:['',Validators.required],
      first_namep:['',Validators.required],
      last_namep:['',Validators.required],
      statep:[''],
      relativep:[''],
      sexp:[''],
      naissancep:[''],
      contactp:[''],
      bedNum:[''],
      passwordrelative:[''],
      depName:this.data.depName,
      start:this.datePipe.transform(this.currdate, 'yyyy-MM-dd HH:mm')
  })
  }

  ngOnInit(){
    this.patientform.patchValue(this.data.patient);
    this.serv.emptybeds(this.data.depName).subscribe(
      (res:any)=>{
        this.empties=res.data
      }
    );
  }
  
  closeDialog(){
    this.dialog.close();
  }

  patientSubmit(){
    this.serv.editpatient(this.patientform.value).subscribe(
      (data:any)=>{
        this.dialog.close();
        this.snack.open('Patient updated successfully','.',{duration:3000})
       }
    )
  }
}
