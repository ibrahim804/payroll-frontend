import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-loan-request',
  templateUrl: './dialog-loan-request.component.html',
  styleUrls: ['./dialog-loan-request.component.scss']
})
export class DialogLoanRequestComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
  }

}
