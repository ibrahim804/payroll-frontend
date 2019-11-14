import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todays-attendance',
  templateUrl: './todays-attendance.component.html',
  styleUrls: ['./todays-attendance.component.css']
})
export class TodaysAttendanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   // Doughnut
  public doughnutChartLabels:string[] = ['Present', 'Late', 'Absent', 'On Leave'];
  public demodoughnutChartData:number[] = [140, 8, 10, 6];
  public doughnutChartType:string = 'doughnut';
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#5cb85c', '#f0ad4e', '#d9534f', '#34495e']
    }
  ]
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
