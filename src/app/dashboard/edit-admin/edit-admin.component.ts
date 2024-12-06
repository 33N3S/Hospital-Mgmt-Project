import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepsereviceService } from 'src/app/depserevice.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent {
  adform:any;
  numbed:any;
  currdate:Date;
  empties:any;
  deps:any[]=[];
  days:any[]=[];
  constructor(private dialog:MatDialogRef<AddAdminComponent>,private fb:FormBuilder,private serv:DepsereviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,private snack:MatSnackBar, private datePipe: DatePipe){
    this.currdate=new Date();
    this.adform = this.fb.group({
      first_namea: ['', Validators.required],
      last_namea: ['', Validators.required],
      passworda: ['', Validators.required],
      contacta:[''],
      gmail:[''],
    })
  this.days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }

  ngOnInit(){
    this.adform.patchValue(this.data.admin)
    console.log(this.data.admin);
    this.serv.getdeps().subscribe(
      (res:any)=>{
        this.deps=res.data;
      }
    )
  }
  
  closeDialog(){
    this.dialog.close();
  }

  DocSubmit(){
    const admin={
      'form':this.adform.value,
      'id':this.data.admin.id
    };
    this.serv.editadmin(admin).subscribe(
      (data:any)=>{
        this.dialog.close();
        this.snack.open('Patient entered successfully','.',{duration:3000})
       }
    )
  }
}
