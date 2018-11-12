import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Helper } from 'src/app/shared/helper';
import { Register } from 'src/app/models/request/register.model';
import { BasePageComponent } from 'src/app/shared/components/base-page/base-page.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { timeout } from 'q';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  host: { 'style': 'width: 100vw;' }
})
export class AuthComponent extends BasePageComponent implements OnInit {

  private authService: AuthService;

  login: Login = new Login();
  register: Register = new Register();

  constructor(router: Router, route: ActivatedRoute, dialog: MatDialog, snackbar: MatSnackBar, authService: AuthService) {
    super(router, route, dialog, snackbar);
    this.authService = authService;
  }

  ngOnInit() {
    if (Helper.isLoggedIn()) {
      this.router.navigate(['/meters']);
    }
  }

  async onLogin() {
    this.loader.show();
    let result = await this.authService.login(this.login, this.onResponseError.bind(this));
    if (result) {
      let params = this.route.snapshot.queryParams;
      if (params['returnUrl']) {
        this.router.navigate([params['returnUrl']]);
      } else {
        this.router.navigate(['/meters']);
      }
    }
    this.loader.hide();
  }

  async onRegister() {
    this.loader.show();
    let result = await this.authService.register(this.register, this.onResponseError.bind(this));
    if (result) {
      this.snackbar.open('Registeration successfull', null, { duration: 2000 });
      this.register = new Register();
    }
    this.loader.hide();
  }
}
