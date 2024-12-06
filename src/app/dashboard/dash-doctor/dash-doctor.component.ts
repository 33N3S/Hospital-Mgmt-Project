import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DepsereviceService } from 'src/app/depserevice.service';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EditNurseComponent } from '../edit-nurse/edit-nurse.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrintCertComponent } from '../print-cert/print-cert.component';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dash-doctor',
  templateUrl: './dash-doctor.component.html',
  styleUrls: ['./dash-doctor.component.css']
})
export class DashDoctorComponent {
  srchform:any;
  cins:any;
  options:any=[];
  patient:any;
  currentTime:any;
  today:Date;
  admins:any[]=[];
  nurses:any[]=[];
  doctors:any[]=[];
  filtered:any[]=[];
  availableDocs:any[]=[];
  availableNurs:any[]=[];
  editform:any;
  elementRef: any;



  constructor(private dialog: MatDialog,private depserv:DepsereviceService,private dialog2:MatDialog,private fb:FormBuilder,private route:ActivatedRoute,
    private router:Router) {
    this.srchform=fb.group({cin:['']})
    this.srchform.get('cin').valueChanges.subscribe(
      (response:any)=>{this.filterData(response)});
    this.today=new Date();
    this.editform=this.fb.group({
      notep:[''],
      statep:[''],
      cinPatient:['']
    })
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
    config2.height="561px";
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

  isAvailable(doc: any):boolean{
    if (doc && doc.DshiftS && doc.DshiftE) { // Check if the properties exist
      const currentTime = new Date();
      const shiftStart = new Date();
      const shiftEnd = new Date();
      const shiftStartParts = doc.DshiftS.split(':');
      const shiftEndParts = doc.DshiftE.split(':');
      shiftStart.setHours(Number(shiftStartParts[0]), Number(shiftStartParts[1]), Number(shiftStartParts[2]));
      shiftEnd.setHours(Number(shiftEndParts[0]), Number(shiftEndParts[1]), Number(shiftEndParts[2]));
      let isWithinShiftTime = false;
      if (shiftEnd < shiftStart) {
        isWithinShiftTime = currentTime >= shiftStart || currentTime <= shiftEnd;
      } else {
        isWithinShiftTime = currentTime >= shiftStart && currentTime <= shiftEnd;
      }
      return isWithinShiftTime;
    }
    else if(doc && doc.NshiftS && doc.NshirtE){
      const currentTime = new Date();
      const shiftStart = new Date();
      const shiftEnd = new Date();
      const shiftStartParts = doc.NshiftS.split(':');
      const shiftEndParts = doc.NshirtE.split(':');
      shiftStart.setHours(Number(shiftStartParts[0]), Number(shiftStartParts[1]), Number(shiftStartParts[2]));
      shiftEnd.setHours(Number(shiftEndParts[0]), Number(shiftEndParts[1]), Number(shiftEndParts[2]));
      let isWithinShiftTime = false;
      if (shiftEnd < shiftStart) {
        isWithinShiftTime = currentTime >= shiftStart || currentTime <= shiftEnd;
      } else {
        isWithinShiftTime = currentTime >= shiftStart && currentTime <= shiftEnd;
      }
      return isWithinShiftTime;
    }
    else{
      return false;
    }
  }

  executeOnInitLogic(){
    this.depserv.getdocdata(this.docNum).subscribe(
    (res:any)=>{  
      this.doctors=res.doctors;
      this.nurses=res.nurses;
      this.options=res.patient;
      })
  };
  

  editNurse(nurse:any){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="390px";
    dialogconfig.data={
      'nurse':nurse
    };
    const dialogRef=this.dialog.open(EditNurseComponent,dialogconfig);
    dialogRef.afterClosed().subscribe(result => {
      this.executeOnInitLogic();
    });

  }
  docNum=4;
  ngOnInit():void{

   this.route.queryParams.subscribe(
    (params)=>{
      this.docNum=params['numDoc'];
      console.log(params['numDoc']);
    }
   ) 
  
  this.executeOnInitLogic();
    this.depserv.getdocdata(this.docNum).subscribe(
      (data:any)=>{
        this.cins=data.patients;
        this.nurses=data.nurses;
        console.log(this.patient,this.nurses);
        this.ELEMENT_DATA=data.patients;
        this.orderData=this.sortByHistory(this.ELEMENT_DATA);
        this.filtered=this.orderData;
      });
  }

  orderData:any[]=[];
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['CIN', 'Bed','State','Notes','Action','print'];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {


      [100-400]:{
        items:2
      },

      [400-940]:{
        items:2
      },

      940: {
        items: 3
      }
    },
    nav: true
  }

  editingRowIndex: number = -1;


  toggleEditMode(index: number) {
    if (this.isEditing(index)) {
      this.editingRowIndex = -1; 
      this.updateNotes(this.filtered[index]);
    } else {
      this.editingRowIndex = index; 
      this.editform.get('statep').patchValue(this.filtered[index]);
    }
  }
  
  isEditing(index: number) {
    return this.editingRowIndex === index;
  }

  updateNotes(element: any) {
    console.log(this.editform.value);
    this.editform.patchValue({
      cinPatient: this.filtered[this.editingRowIndex].cinPatient
    });
    this.depserv.editpatient(this.editform.value).subscribe(
    (data:any)=>{
      console.log(data);
    });
    this.executeOnInitLogic();
    this.toggleEditMode(this.editingRowIndex);
  }

  sortByHistory(array: any[]): any[] {
    return array.sort((a, b) => {
      const dateA = new Date(a.historyp);
      const dateB = new Date(b.historyp);
      return dateB.getTime() - dateA.getTime();
    });
  }

  goprint(patient:any){
    this.router.navigate(['/print'], { queryParams: { patient: JSON.stringify(patient) } });
  }

}

