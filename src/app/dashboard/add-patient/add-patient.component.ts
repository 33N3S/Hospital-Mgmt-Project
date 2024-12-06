import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef,MatDialogConfig,MatDialogActions } from '@angular/material/dialog';
import { FormControl,Validators,FormGroup,FormBuilder,FormsModule } from '@angular/forms';
import { DepsereviceService } from 'src/app/depserevice.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  patientform:any;
  numbed:any;
  currdate:Date;
  empties:any;

  constructor(private dialog:MatDialogRef<AddPatientComponent>,private fb:FormBuilder,private serv:DepsereviceService,
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
    this.serv.emptybeds(this.data.depName).subscribe(
      (res:any)=>{this.empties=res.data
      console.log(res)}
    );
  }
  
  closeDialog(){
    this.dialog.close();
  }

  patientSubmit(){
    this.serv.addpatient(this.patientform.value).subscribe(
      (data:any)=>{
        this.dialog.close();
        this.snack.open('Patient entered successfully','.',{duration:3000})
       }
    )
  }



}
