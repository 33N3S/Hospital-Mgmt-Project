import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepsereviceService } from 'src/app/depserevice.service';
import { AddNurseComponent } from '../add-nurse/add-nurse.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-nurse',
  templateUrl: './edit-nurse.component.html',
  styleUrls: ['./edit-nurse.component.css']
})
export class EditNurseComponent {
  nurform:any;
  docs:any[]=[];
  days:any[]=[];
  constructor(private dialog:MatDialogRef<AddNurseComponent>,private fb:FormBuilder,private serv:DepsereviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,private snack:MatSnackBar, private datePipe: DatePipe,private location: Location){
    this.nurform = this.fb.group({
      first_nameN: ['', Validators.required],
      last_nameN: ['', Validators.required],
      NshiftS: ['', Validators.required],
      NshirtE: ['', Validators.required],
      numDoc: [''],
      daysN :[[]],
    })
  this.days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }

  ngOnInit(){
    this.nurform.patchValue(this.data.nurse);
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
    const nurse={
      'form':this.nurform.value,
      'id':this.data.nurse.nurseNum
    }
    
    console.log(nurse);
    this.serv.editnurse(nurse).subscribe(
      (data:any)=>{
        this.dialog.close();
        this.snack.open('Nurse updated successfully','.',{duration:3000});
       }
    );
    
  }

}