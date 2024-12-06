import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

  public hideToolbar: boolean = true;
  public togglenav:boolean =true;
  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.togglenav= this.router.url.includes('/doctor')||this.router.url.includes('/print');
      this.hideToolbar = this.router.url === '/' || this.router.url === '/about' ||  this.router.url === '/login' || this.router.url.includes('/guest') || this.router.url === '/loginadmin'||this.router.url === '/#services-section' || this.router.url === '/#footer' ;
    });
  }
  
  isDisabled(): boolean {
    const currentRoute = this.router.url;
    const disabledRoute = '/home';
    return currentRoute === disabledRoute;
  }
  
  title = 'hospitall';
  showFiller = false;
}
