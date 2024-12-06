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
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
  docform:any;
  numbed:any;
  currdate:Date;
  empties:any;
  deps:any[]=[];
  days:any[]=[];
  constructor(private dialog:MatDialogRef<AddDoctorComponent>,private fb:FormBuilder,private serv:DepsereviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,private snack:MatSnackBar, private datePipe: DatePipe){
    this.currdate=new Date();
    this.docform = this.fb.group({
      first_nameD: ['', Validators.required],
      last_nameD: ['', Validators.required],
      specD: [''],
      passwordD: ['', Validators.required],
      DshiftS: ['', Validators.required],
      DshiftE: ['', Validators.required],
      depNum: ['', Validators.required],
      contactD: [''],
      daysD :[[], Validators.required],
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
    this.serv.adddoctor(this.docform.value).subscribe(
      (data:any)=>{
        this.dialog.close();
        console.log(this.docform.value)
        this.snack.open('Doctor registered successfully','.',{duration:3000})
       }
    )
  }



}
