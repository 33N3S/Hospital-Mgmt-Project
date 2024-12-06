import { Component } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { CarouselSlideDirective } from 'ngx-owl-carousel-o';
import { DepsereviceService } from 'src/app/depserevice.service';

@Component({
  selector: 'app-dash-landing',
  templateUrl: './dash-landing.component.html',
  styleUrls: ['./dash-landing.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class DashLandingComponent {

  constructor(private depserv:DepsereviceService){}
  liveNums:any;
  ngOnInit(){
    this.depserv.getchartdata().subscribe(
      (data:any)=>{
        this.liveNums=data.liveNums;
        console.log(this.liveNums)
      }
    )
  }

  interval = 2000;
  slides = [
    {
      imageSrc: '../../assets/images/calendar.png',
      title: '24 Hours Services',
      description: 'Round-the-Clock Emergency Care Services: Available 24/7 to Serve You.'
    },
    {
      imageSrc: '../../assets/images/staff.png',
      title: 'Professional Staff',
      description: 'Expertly Trained Professionals Dedicated to Your Emergency Care Needs.'
    },
    {
      imageSrc: '../../assets/images/ambulance.png',
      title: 'Emergency Care',
      description: 'Providing Expert Emergency Care When Every Second Counts.'
    }
  ];

}
