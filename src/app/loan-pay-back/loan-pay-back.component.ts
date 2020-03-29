import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-loan-pay-back',
  templateUrl: './loan-pay-back.component.html',
  styleUrls: ['./loan-pay-back.component.scss']
})
export class LoanPayBackComponent implements AfterViewInit, OnInit {

  constructor() { }

  ngOnInit() {}

  applyFilter(filterValue: string) {
    // this.payBackRequests.filter = filterValue.trim().toLowerCase();
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

  ngAfterViewInit() {}

}
