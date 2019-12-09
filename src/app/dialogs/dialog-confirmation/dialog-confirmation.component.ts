import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {

  isExpanded = false;
  expandedMessage = 'Request For Leave';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    if (this.data.message === this.expandedMessage) {
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }

}
