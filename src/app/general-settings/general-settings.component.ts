import { Component, OnInit } from '@angular/core';
import { GeneralSettingsService } from '../_services/general-settings.service';
import { Company } from '../_models/company';
import { WorkingDays } from '../_models/workingDays';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {

  private company;
  private workingDays;

  constructor(private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
    this.generalSettingsService.getCompanyInfo().subscribe(data => {
      this.showCompanyInfo(data[0]);
    })
  }

  showCompanyInfo(info){
    (<HTMLInputElement>document.getElementById("company_name")).value = info.name;
    (<HTMLInputElement>document.getElementById("email")).value = info.email;
    (<HTMLInputElement>document.getElementById("address")).value = info.address;
    (<HTMLInputElement>document.getElementById("country")).value = info.country;
    (<HTMLInputElement>document.getElementById("phone")).value = info.phone;
    (<HTMLInputElement>document.getElementById("mobile")).value = info.mobile;
    (<HTMLInputElement>document.getElementById("website")).value = info.website;
  }



  createNewCompany(){
    let workingDays = new WorkingDays;
    let company = new Company;
    
    workingDays.sunday = (<HTMLInputElement>document.getElementById("sun")).checked.toString();
    workingDays.monday = (<HTMLInputElement>document.getElementById("mon")).checked.toString();
    workingDays.tuesday = (<HTMLInputElement>document.getElementById("tue")).checked.toString();
    workingDays.wednesday = (<HTMLInputElement>document.getElementById("wed")).checked.toString();
    workingDays.thursday = (<HTMLInputElement>document.getElementById("thu")).checked.toString();
    workingDays.friday = (<HTMLInputElement>document.getElementById("fri")).checked.toString();
    workingDays.saturday = (<HTMLInputElement>document.getElementById("sat")).checked.toString();
    
    this.generalSettingsService.updateWorkingDays(workingDays).subscribe(data => {
      console.log(data);

      if(data[0].status == "FAILED"){
        console.log(data[0].message);
      }
      
      else{
        company.name = (<HTMLInputElement>document.getElementById("company_name")).value;
        company.email = (<HTMLInputElement>document.getElementById("email")).value;
        company.address = (<HTMLInputElement>document.getElementById("address")).value;
        company.country = (<HTMLInputElement>document.getElementById("country")).value;
        company.phone = (<HTMLInputElement>document.getElementById("phone")).value;
        company.mobile = (<HTMLInputElement>document.getElementById("mobile")).value;
        company.website = (<HTMLInputElement>document.getElementById("website")).value;
        company.working_day_id = data[0].working_day_id.toString();

        this.generalSettingsService.updateCompanyInfo(company).subscribe(data => {
          console.log(data);
        })
      }
    })
  }

  updateCompanyInfo(){
  }
}
