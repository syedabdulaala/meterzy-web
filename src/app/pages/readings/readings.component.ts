import { Component, OnInit } from '@angular/core';
import { Reading } from 'src/app/models/reading.model';
import { SelectDataSource } from 'src/app/models/data-source.model';
import { Helper } from 'src/app/shared/helper';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BasePageComponent } from 'src/app/shared/components/base-page/base-page.component';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent extends BasePageComponent implements OnInit {

  readings: Reading[] = [];
  reading: Reading = new Reading();
  meters: SelectDataSource[] = [];
  selectedMeterId: number = 0;

  constructor(router: Router, route: ActivatedRoute, dialog: MatDialog, snackbar: MatSnackBar) {
    super(router, route, dialog, snackbar);
  }

  ngOnInit() {
    this.initMockData();
  }

  private initMockData() {
    for (let i = 0; i < 5; i++) {
      const dataSource = new SelectDataSource();
      dataSource.id = (i + 1);
      dataSource.name = 'Meter ' + (i + 1);
      this.meters.push(dataSource);
    }

    for (let i = 0; i < 25; i++) {
      const reading = new Reading();
      reading.id = (i + 1);
      reading.date = new Date();
      reading.time = '11:00 AM';
      reading.units = Helper.getRandomInt(100, 200);
      reading.meterId = Helper.getRandomInt(1, 5);
      this.readings.push(reading);      
    }
  }

  protected onMeterChanged(id) {
    this.readings = [];
    for (let i = 0; i < 25; i++) {
      const reading = new Reading();
      reading.id = (i + 1);
      reading.date = new Date();
      reading.time = '11:00 AM';
      reading.units = Helper.getRandomInt(100, 200);
      reading.meterId = id;
      this.readings.push(reading);      
    }
  }

  protected newReading() {
    this.reading = new Reading();
  }

  protected editReading(id: number) {
    this.reading = this.readings.find(x => x.id == id);
  }

  protected deleteReading(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(status => {
      if (status) {
        const index = this.readings.findIndex(x => x.id == id);
        this.readings.splice(index, 1);
        this.snackbar.open('Deleted Successfully!', null, { duration: 2000 });
      }
    });
  }

}
