import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddDepComponent } from '../add-dep/add-dep.component';
import { MatDialog,MatDialogConfig,MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepsereviceService } from 'src/app/depserevice.service';
import { department,patient,room } from 'src/app/hospital';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent {

  deps:any;
  patient:any;
  cins:any;
  options:any=[];
  srchform:any;
  constructor(private dialog: MatDialog,private depserv:DepsereviceService,private dialog2:MatDialog,private fb:FormBuilder) {
    this.srchform=fb.group({cin:['']})
    this.srchform.get('cin').valueChanges.subscribe(
      (response:any)=>{this.filterData(response)})
  }

  openDialog() {
    const dialogconfig= new MatDialogConfig();
    dialogconfig.width="450px";
    dialogconfig.height="325px";
    this.dialog.open(AddDepComponent,dialogconfig);
  }
  filterData(data:any){
    this.options=this.cins.filter((c:any)=>{
      return c.cinPatient.toLowerCase().indexOf(data.toLowerCase()) > -1;
    })
  }

  onSub(cin:string){

    const config2=new MatDialogConfig();
    config2.disableClose=true;
    config2.autoFocus=true;
    config2.width="780px";
    config2.height="559px";
    this.depserv.searchpatient(cin).subscribe(
      (res:any)=>{
        this.patient=res.data;
        config2.data = {
          patient:this.patient,
          doc:res.doc,
          dep:res.dep
        };
        this.dialog2.open(PatientInfoComponent,config2);
      }
    );
  }

  ngOnInit():void{
    this.depserv.getdeps().subscribe(
      (res:any)=>{
       this.deps=res.data;
      }
    );

    this.depserv.getallpatients().subscribe(
      (data:any)=>{
        this.cins=data.data;
      })
  }
 
 
}
