import { AuthService } from './../all_services/auth.service';
import { urlRoutes, genericNavConstants } from './../config/apiRoutes';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import _ from 'lodash';
@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: [ './nav.component.scss' ]
})
export class NavComponent implements OnInit {
	public chosenView;

	// isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((result) => result.matches), shareReplay());

	title: string = genericNavConstants.siteName.name;
	sidebar = [];
	// Username: any = dupayConst.username;
	menuItems = genericNavConstants.menu;
	selectedRow: number;
	isExpanded: boolean = false;
	isAuthenticated: boolean = false;
	urlPaths = urlRoutes;
	userRole: string;

	constructor(
		private breakpointObserver: BreakpointObserver,
		private authenticationService: AuthService,
		private router: Router,
		private data: DataService,
		private activeRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.data.currentMessage.subscribe((message) => (this.chosenView = message));
		this.initiateVariables();
		this.checkRow();
		this.setRole();
	}
	initiateVariables() {
		this.title = genericNavConstants.siteName.name;
	}
	checkRow() {
		let currentUrl = this.router.url;
		let count = 0;
		for (let i of this.sidebar) {
			if (currentUrl == `/${i.url}`) {
				this.selectedRow = count;
				break;
			}
			count += 1;
		}
	}

	public viewChanger(view): void {
		this.chosenView = view;
	}

	logout() {
		this.authenticationService.logout();
	}
	setRole() {
		this.userRole=this.authenticationService.getCurrentRole();
		this.makeSideBar();
	}
	makeSideBar() {
		let auth = false;
		if (this.userRole) {
			auth = true;
			_.forEach(genericNavConstants.sideBar, (res) => {
				let exists = _.includes(res.role, this.userRole);
				if (exists) {
					this.sidebar.push(res);
				}
			});
		}
		// if (this.userRole && this.userRole == Token_Role.ANNONYMOUS) {
		// 	auth = false;
		// }

		// this.checkAuthentication(auth);
		this.checkRow();
  }
  route(url) {
		this.router.navigate([ url ]).then(res=>{
			this.checkRow();
		});
  }
  selectRow(index) {
    this.selectedRow = index;
    // debugger; //
	}
}
