import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/models/login.model';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { BaseResponse } from 'src/app/models/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  public async login(reqObj: Login, loader?: LoaderComponent): Promise<any> {
    const loaderId = this.watchLoader(loader);
    let resp = await this.post('/auth/login', reqObj, loaderId);
    if (this.isSuccess(resp)) {
      let data = (<any>resp.data);
      localStorage.setItem('usr', data.token);
      delete resp.data['token'];
      console.log(resp);
    }
    else {
      alert(JSON.stringify(resp));
    }
    return resp.data;
  }
}
