import { Component, EventEmitter, Output  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public chosenView;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationServiceService, private router: Router, private data: DataService) {}

  ngOnInit(){
    this.data.currentMessage.subscribe(message => this.chosenView = message);
  }

  public viewChanger(view): void {
    this.chosenView = view;
  }

  logout() {
    this.authenticationService.logout().subscribe(data => {
      if (data[0].status === 'OK') {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}
