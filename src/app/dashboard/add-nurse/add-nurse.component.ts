import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepsereviceService } from 'src/app/depserevice.service';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';

@Component({
  selector: 'app-add-nurse',
  templateUrl: './add-nurse.component.html',
  styleUrls: ['./add-nurse.component.css']
})
export class AddNurseComponent {
  nurform:any;
  docs:any[]=[];
  days:any[]=[];
  constructor(private dialog:MatDialogRef<AddNurseComponent>,private fb:FormBuilder,private serv:DepsereviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,private snack:MatSnackBar, private datePipe: DatePipe){
    this.nurform = this.fb.group({
      first_nameN: ['', Validators.required],
      last_nameN: ['', Validators.required],
      NshiftS: ['', Validators.required],
      NshirtE: ['', Validators.required],
      numDoc: ['', Validators.required],
      daysN :[[], Validators.required],
    })
  this.days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }

  ngOnInit(){

    this.serv.getemployees().subscribe(
      (res:any)=>{
        this.docs=res.doctors;
        console.log(res.doctors);
      }
    )
  }
  
  closeDialog(){
    this.dialog.close();
  }

  DocSubmit(){
    this.serv.addnurse(this.nurform.value).subscribe(
      (data:any)=>{
        this.dialog.close();
        this.snack.open('Patient entered successfully','.',{duration:3000})
       }
    )
  }


}
