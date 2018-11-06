import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  host: { 'style': 'width: 100vw;' }
})
export class AuthComponent implements OnInit {
  @ViewChild('loginLoader')
  loginLoader: LoaderComponent;

  private authService: AuthService;
  private router: Router;
  private route: ActivatedRoute;

  login: Login = new Login();

  constructor(authService: AuthService, router: Router, route: ActivatedRoute) {
    this.router = router;
    this.route = route;
    this.authService = authService;
  }

  ngOnInit() {
    if (Helper.isLoggedIn()) {
      this.router.navigate(['/meters']);      
    }
  }

  async onLogin() {
    let data = await this.authService.login(this.login, this.loginLoader);
    let params = this.route.snapshot.queryParams;
    if (params['returnUrl']) {
      this.router.navigate([params['returnUrl']]);
    } else {
      this.router.navigate(['/meters']);
    }
  }

}
