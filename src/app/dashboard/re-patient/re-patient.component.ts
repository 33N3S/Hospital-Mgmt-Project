import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DepsereviceService } from 'src/app/depserevice.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNullOrUndef } from 'chart.js/dist/helpers/helpers.core';
import { patient } from 'src/app/hospital';
@Component({
  selector: 'app-re-patient',
  templateUrl: './re-patient.component.html',
  styleUrls: ['./re-patient.component.css']
})
export class RePatientComponent {
  addform:any;
  beds:any;
  currdate:any;
  cins:any[]=[];
  options:any[]=[];
  pat:any;
  
  constructor(private serv:DepsereviceService,private fb:FormBuilder,private dialog :MatDialogRef<RePatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private pipe:DatePipe,private snack:MatSnackBar){
    
      this.currdate=new Date();
      this.addform=this.fb.group({
      cinPatient:['',Validators.required],
      bedNum:['',Validators.required],
      statep:[''],
      start:this.pipe.transform(this.currdate, 'yyyy-MM-dd HH:mm')
      })
      this.addform.get('cinPatient').valueChanges.subscribe(
        (response:any)=>{this.filterData(response)}
      )
  }

  ngOnInit(){
    this.serv.emptybeds(this.data.depName).subscribe(
      (data:any)=>{this.beds=data.data;}
    )

    this.serv.getallpatients().subscribe(
      (data:any)=>{

        for(let cin of data.data){
          if(!cin.bedNum){
            this.cins.push(cin);
            
          }
        }
        console.log(this.cins)
      }
    )
  }

  filterData(data: any) {
    this.options = this.cins.filter((c: any) =>
      c.cinPatient.toLowerCase().indexOf(data.toLowerCase()) > -1
    );
    console.log(this.options);
  }

  closedialog(){
    this.dialog.close()
  }

  onSubmit(){
    console.log(this.addform.value);
    this.serv.repatient(this.addform.value).subscribe(
      (data:any)=>{
        this.dialog.close();
        this.snack.open('Patient entered successfully','.',{duration:3000})
      },
      (error:any)=>{
        this.dialog.close();
        console.log(error);
        this.snack.open('error',this.data.message,{duration:3000})
      }
    )
  }

  finder(cin:any){
    for(let patient of this.cins ){
       if(patient.cinPatient == cin){
        this.pat= patient;
       }
    }
  }


}

