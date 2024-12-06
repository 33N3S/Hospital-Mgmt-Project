import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepsereviceService } from 'src/app/depserevice.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
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

    this.serv.getdeps().subscribe(
      (res:any)=>{
        this.deps=res.data;
        console.log(res.data);
      }
    )
  }
  
  closeDialog(){
    this.dialog.close();
  }

  DocSubmit(){
    this.serv.addadmin(this.adform.value).subscribe(
      (data:any)=>{
        this.dialog.close();
        this.snack.open('Patient entered successfully','.',{duration:3000})
       }
    )
  }
}
