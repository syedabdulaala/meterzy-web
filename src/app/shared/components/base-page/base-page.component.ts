import { ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

export abstract class BasePageComponent {
  @ViewChild('appLoader')
  protected loader: LoaderComponent;

  protected router: Router;
  protected route: ActivatedRoute;
  protected dialog: MatDialog;
  protected snackbar: MatSnackBar;

  constructor(router: Router, route: ActivatedRoute, dialog: MatDialog, snackbar: MatSnackBar) {
    this.router = router;
    this.route = route;
    this.dialog = dialog;
    this.snackbar = snackbar;
  }

  protected onResponseError(msg: string) {
    debugger;
    this.snackbar.open(msg, null, { duration: 5000 });
    this.loader.hide();
  }
}
