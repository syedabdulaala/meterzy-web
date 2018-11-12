import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/models/login.model';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { BaseResponse } from 'src/app/models/response/base-response';
import { Register } from 'src/app/models/request/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  public async login(reqObj: Login, errorCallback: (msg: string) => void): Promise<boolean> {
    let resp = await this.post('/auth/login', reqObj);
    if (this.isSuccess(resp)) {
      let data = (<any>resp.data);
      localStorage.setItem('usr', data.token);
      delete resp.data['token'];
      return true;
    }
    else {
      errorCallback(resp.message);
      return false;
    }
  }

  public async register(reqObj: Register, errorCallback: (msg: string) => void): Promise<boolean> {
    let resp = await this.post('/auth/register', reqObj);
    if (this.isSuccess(resp)) {
      return true;
    }
    else {
      errorCallback(resp.message);
      return false;
    }
  }

}
