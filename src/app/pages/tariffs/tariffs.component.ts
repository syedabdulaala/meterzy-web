import { Component, OnInit } from '@angular/core';
import { Tariff, RangedTariff, FixedTariff } from '../../models/tariff.model';
import { Helper } from 'src/app/shared/helper';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { config } from 'rxjs';
import { BasePageComponent } from 'src/app/shared/components/base-page/base-page.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.css'],
  host: { 'style': 'width: 100vw;' }
})
export class TariffsComponent extends BasePageComponent implements OnInit {

  tariffs: Tariff[] = [];
  tariff: Tariff = new Tariff();

  constructor(router: Router, route: ActivatedRoute, dialog: MatDialog, snackbar: MatSnackBar) {
    super(router, route, dialog, snackbar);
  }

  ngOnInit() {
    this.initMockData();
    this.newTariff();
  }

  initMockData() {
    for (let i = 0; i < 25; i++) {
      let tariff = new Tariff();
      tariff.id = i + 1;
      tariff.name = 'Tariff ' + (i + 1);

      let rangedTariffLength = Helper.getRandomInt(0, 5);
      for (let j = 0; j < rangedTariffLength; j++) {
        let rangedTariff = new RangedTariff();
        rangedTariff.id = j + 1;
        rangedTariff.name = 'Ranged ' + (j + 1);
        rangedTariff.upperLimit = Helper.getRandomInt(201, 700);
        rangedTariff.lowerLimit = Helper.getRandomInt(1, 200);
        rangedTariff.charges = Helper.getRandomInt(5, 20);
        tariff.rangedTariffs.push(rangedTariff);
      }

      let fixedTariffLength = Helper.getRandomInt(0, 5);
      for (let j = 0; j < fixedTariffLength; j++) {
        let fixedTariff = new FixedTariff();
        fixedTariff.id = j + 1;
        fixedTariff.name = 'Fixed ' + (j + 1);
        fixedTariff.charges = Helper.getRandomInt(5, 20);
        tariff.fixedTariffs.push(fixedTariff);
      }

      this.tariffs.push(tariff);
    }

    console.log(this.tariffs);
  }

  protected newTariff() {
    this.tariff = new Tariff();
    this.tariff.rangedTariffs.push(new RangedTariff());
    this.tariff.fixedTariffs.push(new FixedTariff());
  }

  protected addNewTariff(isRanged: boolean) {
    if (isRanged) {
      this.tariff.rangedTariffs.push(new RangedTariff());
    }
    else {
      this.tariff.fixedTariffs.push(new FixedTariff());
    }
  }

  protected removeTariff(isRanged: boolean, index: number) {
    if (isRanged) {
      this.tariff.rangedTariffs.splice(index, 1);
    }
    else {
      this.tariff.fixedTariffs.splice(index, 1);
    }
  }

  protected editTariff(id: number) {
    this.tariff = Object.create(this.tariffs.find(x => x.id == id));
  }

  protected deleteTariff(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(status => {
      if (status) {
        const index = this.tariffs.findIndex(x => x.id == id);
        this.tariffs.splice(index, 1);
        this.snackbar.open('Deleted Successfully!', null, { duration: 2000 });
      }
    });
  }
}
