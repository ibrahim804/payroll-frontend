import { AuthService } from './../all_services/auth.service';
import { urlRoutes, genericNavConstants } from './../config/apiRoutes';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import _ from 'lodash';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public chosenView;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title: string = genericNavConstants.siteName.name;
  userName: string;
  base64String: Text;
  sidebar = [];
  menuItems = genericNavConstants.menu;
  selectedRow: number;
  isExpanded = false;
  isAuthenticated = false;
  urlPaths = urlRoutes;
  userRole: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private data: DataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.chosenView = message));
    this.initiateVariables();
    this.setRole();
    this.makeSideBar();
    this.checkRow();
  }

  initiateVariables() {
    this.title = genericNavConstants.siteName.name;
    this.userName = this.authService.getValueFromLocalStorage('full_name');
    // this.base64String = this.authService.getValueFromLocalStorage('photo');
  }

  checkRow() {
    const currentUrl = this.router.url;
    let count = 0;
    for (let i of this.sidebar) {
      if (currentUrl == `${i.url}`) {
        this.selectedRow = count;
        break;
      }
      count += 1;
    }
  }

  viewChanger(view): void {
    this.chosenView = view;
  }

  setRole() {
    this.userRole = this.authService.getCurrentRole();
  }

  makeSideBar() {
    let auth = false;
    if (this.userRole) {
      auth = true;
      _.forEach(genericNavConstants.sideBar, res => {
        const exists = _.includes(res.role, this.userRole);
        if (exists) {
          this.sidebar.push(res);
        }
      });
    }
    // if (this.userRole && this.userRole == Token_Role.ANNONYMOUS) {
    // 	auth = false;
    // }

    // this.checkAuthentication(auth);
  }

  route(url) {
    this.router.navigate([url]).then(res => {
      this.checkRow();
    });
  }

  selectRow(index) {
    this.selectedRow = index;
  }

  redirectsToDetails() {
    this.router.navigate([urlRoutes.employeesDetails]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([urlRoutes.login]);
  }
}
