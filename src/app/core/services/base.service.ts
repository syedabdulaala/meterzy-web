import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/models/response/base-response';
import { Router } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';


export abstract class BaseService {
  private http: HttpClient;
  private router: Router;

  constructor(http: HttpClient, router: Router) {
    this.http = http;
  }

  protected async get(url: string, params?: HttpParams, loaderId?: number) {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.get<BaseResponse>(url, { params: params, observe: 'response' }).toPromise()
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    }
  }

  protected async post(url: string, body?: object): Promise<BaseResponse> {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.post<BaseResponse>(url, body, { observe: 'response' }).toPromise()
      resp.body.statusCode = resp.status;
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    }
  }

  protected async put(url: string, body?: object) {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.put<BaseResponse>(url, body, { observe: 'response' }).toPromise()
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    }
  }

  protected async delete(url: string, params?: HttpParams) {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.delete<BaseResponse>(url, { params: params, observe: 'response' }).toPromise()
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    }
  }

  protected isSuccess(resp: BaseResponse): boolean {
    return resp.statusCode === 200;
  }

  private handleFailedResponse(ex): BaseResponse {
    if (ex.status === 401) {
      this.router.navigate(['/auth']);
    }
    if (ex.error) {
      let error = ex.error;
      return new BaseResponse(error.code, error.message, ex.status, error.data);
    }
    this.router.navigate(['/oops']);
  }
}
