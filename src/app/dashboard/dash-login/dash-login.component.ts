import { Component, ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { DepsereviceService } from 'src/app/depserevice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { patient } from 'src/app/hospital';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dash-login',
  templateUrl: './dash-login.component.html',
  styleUrls: ['./dash-login.component.css']
})
export class DashLoginComponent {

  guestForm:any;
  docForm:any;
  constructor(private elementRef: ElementRef,private fb:FormBuilder,private serv : DepsereviceService,private router:Router,private snack:MatSnackBar,private datePipe:DatePipe) { 
    const currdate=new Date();
    this.guestForm=this.fb.group({
      'CIN':['',Validators.required],
      'password':['',Validators.required],
    });
    this.docForm=this.fb.group({
      'Tel':['',Validators.required],
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


  ngAfterViewInit(): void {
    const sign_in_btn = this.elementRef.nativeElement.querySelector("#sign-in-btn");
    const sign_up_btn = this.elementRef.nativeElement.querySelector("#sign-up-btn");
    const container = this.elementRef.nativeElement.querySelector(".container");
    const sign_in_btn2 = this.elementRef.nativeElement.querySelector("#sign-in-btn2");
    const sign_up_btn2 = this.elementRef.nativeElement.querySelector("#sign-up-btn2");

    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

    sign_up_btn2.addEventListener("click", () => {
        container.classList.add("sign-up-mode2");
    });
    sign_in_btn2.addEventListener("click", () => {
        container.classList.remove("sign-up-mode2");
    });
  }
}

