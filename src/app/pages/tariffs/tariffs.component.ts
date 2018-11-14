import { Component, OnInit } from '@angular/core';
import { Tariff } from '../../models/response/tariff.model';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BasePageComponent } from 'src/app/shared/components/base-page/base-page.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TariffService } from 'src/app/core/services/tariff.service';
import { RangedTariff } from 'src/app/models/response/ranged-tariff.model';
import { FixedTariff } from 'src/app/models/response/fixed-tariff.model';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.css'],
  host: { 'style': 'width: 100vw;' }
})
export class TariffsComponent extends BasePageComponent implements OnInit {

  private tariffService: TariffService;

  tariffs: Tariff[] = [];
  tariff: Tariff = new Tariff();

  constructor(router: Router, route: ActivatedRoute, dialog: MatDialog, snackbar: MatSnackBar, tariffService: TariffService) {
    super(router, route, dialog, snackbar);
    this.tariffService = tariffService;
  }

  ngOnInit() {
    this.getData();
    this.onNewTariff();
  }

  private async getData() {
    this.loader.show();
    var result = await this.tariffService.getAll(this.onResponseError.bind(this));
    if (result) {
      this.tariffs = result;
    }
    this.loader.hide();
  }

  onNewTariff() {
    this.tariff = new Tariff();
    this.tariff.rangedTariffs.push(new RangedTariff());
    this.tariff.fixedTariffs.push(new FixedTariff());
  }

  onAddTariff(isRanged: boolean) {
    if (isRanged) {
      this.tariff.rangedTariffs.push(new RangedTariff());
    }
    else {
      this.tariff.fixedTariffs.push(new FixedTariff());
    }
  }

  onRemoveTariff(isRanged: boolean, index: number) {
    if (isRanged) {
      this.tariff.rangedTariffs.splice(index, 1);
    }
    else {
      this.tariff.fixedTariffs.splice(index, 1);
    }
  }

  onEdit(id: number) {
    this.tariff = this.tariffs.find(x => x.id == id);
  }

  async onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(status => {
      if (status) {
        this.loader.show();
        let result = this.tariffService.remove(id, this.onResponseError.bind(this));
        if(result) {
          const index = this.tariffs.findIndex(x => x.id == id);
          this.tariffs.splice(index, 1);
          this.snackbar.open('Tariff deleted successfully!', null, { duration: 2000 });
        }
        this.loader.hide();
      }
    });
  }

  async onSave() {
    this.loader.show();
    var result = await this.tariffService.add(this.tariff, this.onResponseError.bind(this));
    if (result) {
      this.snackbar.open('Tariff saved successfully!', null, { duration: 2000 });
    }
    this.loader.hide();
  }

  async onUpdate() {
    this.loader.show();
    var result = await this.tariffService.update(this.tariff, this.onResponseError.bind(this));
    if (result) {
      this.snackbar.open('Tariff updated successfully!', null, { duration: 2000 });
    }
    this.loader.hide();
  }
}
