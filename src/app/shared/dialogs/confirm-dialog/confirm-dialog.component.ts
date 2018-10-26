import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  private ref: MatDialogRef<ConfirmDialogComponent>;

  title: string = 'Confirmation Required!';
  content: string = 'Are you sure to perform this action?';

  constructor(ref: MatDialogRef<ConfirmDialogComponent>) {
    this.ref = ref;
   }

  ngOnInit() {
  }

  //EVENTS
  protected onNo() {
    this.ref.close(false);
  }

  protected onYes() {
    this.ref.close(true);
  }

}
