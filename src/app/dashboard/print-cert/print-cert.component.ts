import { Component } from '@angular/core';
import * as html2pdf from 'html2pdf.js'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-print-cert',
  templateUrl: './print-cert.component.html',
  styleUrls: ['./print-cert.component.css']
})
export class PrintCertComponent {
  today:any;
  constructor(private route: ActivatedRoute) {
    this.today= new Date();
   }
  patient:any;

  download(){
    var element = document.getElementById('certificateContainer');
    var opt = {
    margin:       1,
    filename:     'Medicale_certificate.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 3 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    
    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

  print(){
    var element = document.getElementById('certificateContainer');
    var opt = {
    margin:       1,
    filename:     'Madicalcertificate.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 3 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    // New Promise-based usage:
    html2pdf().from(element).set(opt).print();
  }

  ngOnInit(){
      this.route.queryParams.subscribe(params => {
        if (params['patient']) {
          this.patient = JSON.parse(params['patient']);
          // Access patient data and perform further actions
        }
      });
      console.log(this.patient)


  }
}
