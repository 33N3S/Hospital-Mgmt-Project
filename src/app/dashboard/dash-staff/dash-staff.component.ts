import { Component } from '@angular/core';
import { department,patient,room } from 'src/app/hospital';
import { FormControl,Validators,FormGroup,FormBuilder,FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { DepsereviceService } from 'src/app/depserevice.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DatePipe, Time } from '@angular/common';
import { doctor,nurses } from 'src/app/hospital';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { AddNurseComponent } from '../add-nurse/add-nurse.component';
import { EditDoctorComponent } from '../edit-doctor/edit-doctor.component';
import { EditNurseComponent } from '../edit-nurse/edit-nurse.component';
import { EditAdminComponent } from '../edit-admin/edit-admin.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
@Component({
  selector: 'app-dash-staff',
  templateUrl: './dash-staff.component.html',
  styleUrls: ['./dash-staff.component.css']
})
export class DashStaffComponent {

  srchform:any;
  constructor(private depserv:DepsereviceService,private fb:FormBuilder,private datepipe:DatePipe,private dialog: MatDialog) {
    this.srchform=fb.group({
      cin:['',Validators.required],
      option:['',Validators.required]
    })
    this.srchform.get('cin').valueChanges.subscribe(
      (response:any)=>{this.filterData(response)})

    this.today=new Date();
    this.currentTime = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  }
  activs:any[]=[];
  currentTime:any;
  today:Date;
  admins:any[]=[];
  nurses:any[]=[];
  doctors:any[]=[];
  options:any[]=[];
  filtered:any[]=[];
  availableDocs:any[]=[];
  availableNurs:any[]=[];

  searchByName(fullname: string): any {
    const nameParts = fullname.split(' ');
    const searchStrings = [fullname, ...nameParts];
  
    let filteredData: any[] = [];
  
    filteredData = this.doctors.filter((employee) =>
      searchStrings.some(
        (searchString) =>
          employee.first_nameD?.includes(searchString) ||
          employee.last_nameD?.includes(searchString)
      )
    );
  
    if (!filteredData.length) {
      filteredData = this.admins.filter((employee) =>
        searchStrings.some(
          (searchString) =>
            employee.first_namea?.includes(searchString) ||
            employee.last_namea?.includes(searchString)
        )
      );
  
      if (!filteredData.length) {
        filteredData = this.nurses.filter((employee) =>
          searchStrings.some(
            (searchString) =>
              employee.first_nameN?.includes(searchString) ||
              employee.last_nameN?.includes(searchString)
          )
        );
      }
    }
  
    return filteredData;
  } 

  filterData(data: any) {
    this.filtered = this.options.filter((c: any) => {
      if (typeof c.first === 'string' && typeof c.last === 'string') {
        const fullName = `${c.first.toLowerCase()} ${c.last.toLowerCase()}`;
        return fullName.toString().indexOf(data.toLowerCase()) > -1;
      }
      return false; // Skip invalid entries
    });
  }
  
  
  displayFn(option: any): string {
    if (option && option.first && option.last) {
      return option.last + ' ' + option.first;
    }
    return '';
  }

  whatIs(object:any):string{
    if(this.doctors.includes(object)){
      return 'Doctor';
    }
    else if(this.admins.includes(object)){
      return 'Admin';
    }
    else{
      return 'Nurse';
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
  
  openEmployeeInfo(emp:any){
    const employee={
      'info':emp,
      'available':this.isAvailable(emp),
      'type':this.whatIs(emp),
      'doctor':this.getDoc(emp.numDoc)
    }
    const config2=new MatDialogConfig();
    config2.disableClose=true;
    config2.autoFocus=true;
    config2.width="800px";
    config2.height="570px";
    config2.data={
      'employee':employee
    };
    this.dialog.open(EmployeeInfoComponent,config2);
  }

  openAddDoc(){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="542px";
    const dialogRef=this.dialog.open(AddDoctorComponent,dialogconfig);
    dialogRef.afterClosed().subscribe(result => {
      this.executeOnInitLogic();
    });
  }

  editDoctor(doctor:any){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="542px";
    dialogconfig.data={
      'doctor':doctor
    };
    const dialogRef=this.dialog.open(EditDoctorComponent,dialogconfig);
    dialogRef.afterClosed().subscribe(result => {
      this.executeOnInitLogic();
    });
  }

  openAddAdmin(){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="390px";
    const dialogRef=this.dialog.open(AddAdminComponent,dialogconfig);
    dialogRef.afterClosed().subscribe(result => {
      this.executeOnInitLogic();
    });
  }

  editAdmin(admin:any){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="390px";
    dialogconfig.data={
      'admin':admin
    };
    const dialogRef=this.dialog.open(EditAdminComponent,dialogconfig);
    dialogRef.afterClosed().subscribe(result => {
      this.executeOnInitLogic();
    });
  }

  openAddNurse(){
    const dialogconfig= new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="600px";
    dialogconfig.height="390px";
    const dialogRef=this.dialog.open(AddNurseComponent,dialogconfig);
    dialogRef.afterClosed().subscribe(result => {
      this.executeOnInitLogic();
    });
  }
  
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

  sortByHistory(array: any[]): any[] {
    return array.sort((a, b) => {
      const dateA = new Date(a.logins);
      const dateB = new Date(b.logins);
      return dateB.getTime() - dateA.getTime();
    });
  }

  executeOnInitLogic(){


      this.depserv.getemployees().subscribe(
      (res:any)=>{  
        this.doctors=res.doctors;
        this.nurses=res.nurses;
        this.admins=res.admins;
        this.activs= this.expandArrayDC(this.doctors);
        this.activs=this.activs.concat(this.expandArrayAD(this.admins));  
        this.activs = this.removeDuplicates(this.activs);
        this.activs=this.sortByHistory(this.activs);
        console.log(this.activs); 
        this.availableDocs=[];
        this.availableNurs=[];
        this.options=[];
        for(let elt of res.admins){
          this.options.push(
            {
              'first':elt.first_namea,
              'last':elt.last_namea,
            }
          )
        }

        for(let elt of res.doctors){
          this.options.push(
            {
              'first':elt.first_nameD,
              'last':elt.last_nameD,
            }
          )
          if(this.isAvailable(elt)){
            this.availableDocs.push(elt);
          }
        }

        for(let elt of res.nurses){
          this.options.push(
            {
              'first':elt.first_nameN,
              'last':elt.last_nameN,
            }
          )
          if(this.isAvailable(elt)){
            this.availableNurs.push(elt);
          }
        }
      })
    };
    

  ngOnInit(){
    this.executeOnInitLogic();
  }
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
          items:3
        },

        940: {
          items: 4
        }
      },
      nav: true
    }

    formatDate(dateString: any): any {
      if (dateString) {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          return this.datepipe.transform(date, 'shortTime');
        }
      }
      return '';
    }

    getDoc(numDoc:any):any{
      for(let elt of this.doctors){
        if(elt.numDoc ==numDoc){
          return {
            'first':elt.first_nameD,
            'last':elt.last_nameD
          }
        }
      }
    }


    expandArrayDC(data: any[]): any[] {
      const objectsArray: any[] = [];
      data.forEach((doctor: any) => {
        const logs = doctor.loginsD;
        if (Array.isArray(logs[0])) {
          logs[0].forEach((log: any) => {
            const newObject = {
              first_namea: doctor.first_nameD,
              last_namea: doctor.last_nameD,
              numDoc: doctor.numDoc,
              logins: log,
              profession: this.whatIs(doctor)
            };
            objectsArray.push(newObject);
          });
        }
      });
    
      console.log(objectsArray); // Moved console.log after the return statement, as it would not be executed if placed before the return
      return objectsArray;
    }
  
   

    expandArrayAD(data: any[]): any[] {
      const objectsArray: any[] = [];
      data.forEach((admin: any) => {
        const logs = admin.logins;
        if (Array.isArray(logs[0])) {
          logs.forEach((elt: any) => {
            elt.forEach((log: any) => {
              const newObject = {
                first_namea: admin.first_namea,
                last_namea: admin.last_namea,
                id: admin.id,
                gmail: admin.gmail,
                logins: log,
                profession: this.whatIs(admin)
              };
              objectsArray.push(newObject);
            });
          });
        }
      });
      console.log(objectsArray)
      return objectsArray;
    }
    
    
    removeDuplicates(data: any[]): any[] {
      const uniqueData: any[] = [];
    
      // Create a Set to store unique objects based on a unique key
      const uniqueSet = new Set();
    
      // Iterate over each element in the data array
      data.forEach((item: any) => {
        // Generate a unique key based on the item's properties that should be considered for uniqueness
        const key = JSON.stringify(item);
    
        // Check if the key is already in the Set
        if (!uniqueSet.has(key)) {
          // If the key is not present, add the item to the uniqueData array and the Set
          uniqueData.push(item);
          uniqueSet.add(key);
        }
      });
    
      return uniqueData;
    }

    
}
