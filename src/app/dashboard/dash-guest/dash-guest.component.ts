import { Component } from '@angular/core';
import { DepsereviceService } from 'src/app/depserevice.service';
import { doctor } from 'src/app/hospital';
import { ActivatedRoute } from '@angular/router';
import { patient } from 'src/app/hospital';

@Component({
  selector: 'app-dash-guest',
  templateUrl: './dash-guest.component.html',
  styleUrls: ['./dash-guest.component.css']
})
export class DashGuestComponent {

  constructor(private serv:DepsereviceService,private route:ActivatedRoute){

  }


  cin:any;
  patient:any;
  docs:any;
  nurs:any;
  supers:any;
  cinPatient:any;
    ngOnInit(){
      this.route.queryParams.subscribe(params => {
        if (params['patient']) {
          this.cin =params['patient'];
        }
      });

      this.serv.searchpatient(this.cin).subscribe(
        (data:any)=>{
          this.patient= data.data;
        })
      this.serv.getemployees().subscribe(
        (res:any)=>{
          this.docs=res.doctors;
          this.nurs=res.nurses;
          this.docs = this.getDoctor(this.patient);
          this.nurs = this.getNurse(this.patient);
        })
    }

    getDoctor(patient:any):any{

      for(let doc of this.docs){
        if(doc.numDoc == patient.numDoc){
          return doc;
        }
      }
    }
    getNurse(patient:any){
      for(let nur of this.nurs){
        if(nur.nurseNum == patient.nurseNum){
          return nur
        }
      }
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


}
