import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Tariff } from 'src/app/models/response/tariff.model';
import { Id } from 'src/app/models/response/id-response.model';

@Injectable({
  providedIn: 'root'
})
export class TariffService extends BaseService {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  public async getAll(errorCallback: (msg: string) => void): Promise<Tariff[]> {
    let resp = await this.get('/tariffs');
    if (this.isSuccess(resp)) {
      let data = (<Tariff[]>resp.data);
      return data;
    }
    else {
      errorCallback(resp.message);
      return null;
    }
  }

  public async add(reqObj: Tariff, errorCallback: (msg: string) => void): Promise<Id> {
    let resp = await this.post('/tariff/add', reqObj);
    if (this.isSuccess(resp)) {
      let data = (<Id>resp.data);
      return data;
    }
    else {
      errorCallback(resp.message);
      return null;
    }
  }

  public async update(reqObj: Tariff, errorCallback: (msg: string) => void): Promise<boolean> {
    let resp = await this.put('/tariff/update', reqObj);
    if (this.isSuccess(resp)) {
      return true;
    }
    else {
      errorCallback(resp.message);
      return false;
    }
  }

  public async remove(id: number, errorCallback: (msg: string) => void): Promise<boolean> {
    const params: HttpParams = new HttpParams();
    params.set('id', id.toString());
    let resp = await this.delete('/tariff/delete', params);
    if (this.isSuccess(resp)) {
      return true;
    }
    else {
      errorCallback(resp.message);
      return false;
    }
  }
}
