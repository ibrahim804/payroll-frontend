import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-leave-details',
  templateUrl: './dialog-leave-details.component.html',
  styleUrls: ['./dialog-leave-details.component.scss']
})
export class DialogLeaveDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
  }

}
