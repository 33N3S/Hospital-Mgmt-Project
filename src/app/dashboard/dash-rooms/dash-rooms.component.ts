import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { department,room,bed,patient,nurses } from 'src/app/hospital';
import { DepsereviceService } from 'src/app/depserevice.service';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { DatePipe } from '@angular/common';
import { RePatientComponent } from '../re-patient/re-patient.component';


@Component({
  selector: 'app-dash-rooms',
  templateUrl: './dash-rooms.component.html',
  styleUrls: ['./dash-rooms.component.css']
})
export class DashRoomsComponent {
  dep:any;
  curdate:Date;
  end:any;

  constructor(private route: ActivatedRoute,private dialog:MatDialog,private serv:DepsereviceService,private dialog2:MatDialog,private datepipe:DatePipe,private dialog3:MatDialog){
    this.curdate=new Date;
    this.end=this.datepipe.transform(this.curdate, 'yyyy-MM-dd HH:mm');
  }

  clearBed(bedNum:number,end:any){
    const bed ={
    'end':end,
    'num':bedNum,
    };
    this.serv.clearbed(bed).subscribe()
  }


  onSub(cin:string){
    this.serv.searchpatient(cin).subscribe();
  }

  openDialog(){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="554px";
    dialogconfig.data = {
      depName: this.dep
    };
    this.dialog.open(AddPatientComponent,dialogconfig);
  }

  openDialog2(){
    const dialogconfig3= new MatDialogConfig();
    dialogconfig3.disableClose=true;
    dialogconfig3.autoFocus=true;
    dialogconfig3.width="600px";
    dialogconfig3.height="350px";
    dialogconfig3.data={
      depName: this.dep
    }
    this.dialog.open(RePatientComponent,dialogconfig3);

  }

  rooms:any;
  beds:any[]=[];
  nums:number[]=[];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dep = params['dep'];
    });

    this.serv.getrooms(this.dep).subscribe(
      (res:any)=>{this.rooms=res.data; 
        for(const r of res.data){
          this.nums.push(r.roomNum);
        }    
    })


  }
 nurse:any;
roomdetail(room:room){
    this.serv.roomdetails(room.roomNum).subscribe(
      (res2:any)=>{
        if (res2 && res2.data && res2.nurse) {
          this.beds=res2.data;
          this.nurse=res2.nurse[0];
          
        } else {
          this.beds=[];
        }
      }
    )
  }

patientdetail(cin:string){
  const config2=new MatDialogConfig();
    config2.disableClose=true;
    config2.autoFocus=true;
    config2.width="780px";
    config2.height="561px";
    this.serv.searchpatient(cin).subscribe(
      (res:any)=>{
        config2.data = {
          patient:res.data,
          depName:this.dep
        };
        this.dialog2.open(PatientInfoComponent,config2);
      }
    );
}

}
  


