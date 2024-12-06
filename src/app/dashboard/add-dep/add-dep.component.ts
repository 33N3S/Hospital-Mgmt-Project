import { Component } from '@angular/core';
import { FormControl,Validators,FormGroup,FormBuilder,FormsModule } from '@angular/forms';
import { MatDialogRef,MatDialogConfig,MatDialogActions } from '@angular/material/dialog';
import { DepsereviceService } from 'src/app/depserevice.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarLabel } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css'],
})
export class AddDepComponent {

  depform:any;
  constructor( private fb:FormBuilder, private dialogRef: MatDialogRef<AddDepComponent>,private depserv:DepsereviceService,private snack:MatSnackBar,
    private route:Router){
    this.depform=fb.group({
      depName:['',Validators.required],
      roomCount:['',Validators.required]
  })
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
  depSubmit(){
    this.depserv.adddep(this.depform.value).subscribe(
      (data:any)=>{
        this.route.navigate(['/']);
        this.dialogRef.close();
        location.reload();
        this.snack.open('Department was added successfully!');
       }
    );
  }

}
