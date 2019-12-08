import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-leave-confirmation',
  templateUrl: './dialog-leave-confirmation.component.html',
  styleUrls: ['./dialog-leave-confirmation.component.scss']
})
export class DialogLeaveConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
  }

}
