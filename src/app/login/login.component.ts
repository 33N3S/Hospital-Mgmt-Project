import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepsereviceService } from '../depserevice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedTabIndex=0;
  loginForm:any;
  guestForm:any;
  docForm:any;
  adForm:any;

  constructor(private fb:FormBuilder,private serv : DepsereviceService,private router:Router,private snack:MatSnackBar,private datePipe:DatePipe) { 
    const currdate=new Date();
    this.guestForm=this.fb.group({
      'CIN':['',Validators.required],
      'password':['',Validators.required],
    });

    this.docForm=this.fb.group({
      'Tel':['',Validators.required],
      'password':['',Validators.required],
      'today':this.datePipe.transform(currdate, 'yyyy-MM-dd HH:mm')
    });

    this.adForm=this.fb.group({
      'mail':['',Validators.required],
      'password':['',Validators.required],
      'today':this.datePipe.transform(currdate, 'yyyy-MM-dd HH:mm')
    })
  }

  patient:any;

  logGuest(form: any) {
    console.log(form.value);
    this.serv.loginGuest(form.value).subscribe(
      (res: any) => {
        this.patient = res.data;
        console.log(this.patient[0]);
        console.log(this.patient[0].cinPatient);
        this.router.navigate(['/guest'], { queryParams: { patient: this.patient[0].cinPatient } });
      },
      (error: any) => {
        this.snack.open('False Creditentials') ;      // Perform any error handling logic here, such as displaying an error message to the user.
        }
    );
  }

  logDoc(form:any){
    console.log(form.value);
    this.serv.loginDoctor(form.value).subscribe(
      (res:any)=>{
        console.log(res.data[0].numDoc);
        this.router.navigate(['/doctor'],{queryParams:{ numDoc: res.data[0].numDoc } });
      }
    )
  }

  adLog(form:any){
    this.serv.loginAdmin(form.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.router.navigate(['/activity']);
      }
    )
  }



}
