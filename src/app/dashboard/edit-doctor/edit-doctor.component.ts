import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepsereviceService } from 'src/app/depserevice.service';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent {
  docform:any;
  numbed:any;
  currdate:Date;
  empties:any;
  deps:any[]=[];
  days:any[]=[];
  docinfo:any;
  constructor(private dialog:MatDialogRef<EditDoctorComponent>,private fb:FormBuilder,private serv:DepsereviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,private snack:MatSnackBar, private datePipe: DatePipe){
    this.currdate=new Date();
    this.docform = this.fb.group({
      first_nameD: ['', Validators.required],
      last_nameD: ['', Validators.required],
      specD: [''],
      passwordD: ['', Validators.required],
      DshiftS: ['', Validators.required],
      DshiftE: ['', Validators.required],
      depNum: [''],
      contactD: [''],
      daysD :[[]]
    });
  this.days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }

  ngOnInit(){
    this.docform.patchValue(this.data.doctor);
    this.serv.getdeps().subscribe(
      (res:any)=>{
        this.deps=res.data;
      }
    )
  }

  findDep(depNum: number): string {
    const department = this.deps.find(dep => dep.depNum === depNum);
    if (department) {
      return department.depName;
    } else {
      return '';
    }
  }
  
  closeDialog(){
    this.dialog.close();
  }

  DocSubmit(){
    this.docinfo={
      'form':this.docform.value,
      'id':this.data.doctor.numDoc
    };
    console.log(this.docinfo)
    this.serv.editdoctor(this.docinfo).subscribe(
      (data:any)=>{
        this.dialog.close();
        this.snack.open('Doctor updated successfully','.',{duration:3000})
       }
    )
  }



}


