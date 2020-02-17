import { urlRoutes } from './../config/apiRoutes';
import { Router } from '@angular/router';
import { CompanyService } from './../all_services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  constructor(
    
  ) { }

  ngOnInit() {
    
  }
}
