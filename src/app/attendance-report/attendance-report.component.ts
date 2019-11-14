import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public doughnutChartLabels:string[] = ['Present', 'Late', 'Absent', 'On Leave'];
  public demodoughnutChartData:number[] = [140, 8, 10, 6];
  public doughnutChartType:string = 'doughnut';
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#5cb85c', '#f0ad4e', '#d9534f', '#34495e']
    }
  ]

}
