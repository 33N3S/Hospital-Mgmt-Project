import { Component, } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { DepsereviceService } from 'src/app/depserevice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { patient } from 'src/app/hospital';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dash-login-admin',
  templateUrl: './dash-login-admin.component.html',
  styleUrls: ['./dash-login-admin.component.css']
})
export class DashLoginAdminComponent {

  adForm:any;
  constructor(private serv :DepsereviceService,private fb:FormBuilder,private datePipe:DatePipe,private route:Router){
    const currdate=new Date();
    this.adForm=this.fb.group({
      'mail':['',Validators.required],
      'password':['',Validators.required],
      'today':this.datePipe.transform(currdate, 'yyyy-MM-dd HH:mm')
    })
  }

  adLog(form:any){
    this.serv.loginAdmin(form.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.route.navigate(['/activity']);
      }
    )
  }
}
