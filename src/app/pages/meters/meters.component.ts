import { Component, OnInit } from '@angular/core';
import { Meter } from '../../models/meter.model';
import { Helper } from 'src/app/shared/helper';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { SelectDataSource } from 'src/app/models/data-source.model';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.css'],
  host: { 'style': 'width: 100vw;' }
})
export class MetersComponent implements OnInit {

  dialog: MatDialog;
  snackbar: MatSnackBar;

  meters: Meter[] = [];
  meter: Meter = new Meter();
  tariffs: SelectDataSource[] = [];

  constructor(dialog: MatDialog, snackbar: MatSnackBar) {
    this.dialog = dialog;
    this.snackbar = snackbar;
  }

  ngOnInit() {
    this.initMockData();
    this.newMeter();
  }

  initMockData() {
    for (let i = 0; i < 5; i++) {
      const dataSource = new SelectDataSource();
      dataSource.id = i + 1;
      dataSource.name = 'Tariff ' + (i + 1);
      this.tariffs.push(dataSource);
    }

    for (let i = 0; i < 25; i++) {
      const meter = new Meter();
      meter.id = i + 1;
      meter.name = 'Meter ' + (i + 1);
      meter.accountNo = Helper.getRandomInt(11111111111111, 99999999999999).toString();
      meter.consumerNo = 'M' + (i + 1) + Helper.getRandomInt(1111, 9999).toString();
      meter.tariffIds = [Helper.getRandomInt(1, 2), Helper.getRandomInt(3, 5)]
      this.meters.push(meter);
    }
  }

  protected newMeter() {
    this.meter = new Meter();
  }

  protected editMeter(id: number) {
    debugger;
    this.meter = this.meters.find(x => x.id == id);
  }

  protected deleteMeter(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(status => {
      if (status) {
        const index = this.meters.findIndex(x => x.id == id);
        this.meters.splice(index, 1);
        this.snackbar.open('Deleted Successfully!', null, { duration: 2000 });
      }
    });
  }

  protected test() {
    debugger;
  }
}
