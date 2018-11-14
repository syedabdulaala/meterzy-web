import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/models/response/base-response';
import { Router } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { Helper } from 'src/app/shared/helper';


export abstract class BaseService {
  private http: HttpClient;
  private router: Router;
  private headers: HttpHeaders;

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  protected async get(url: string, params?: HttpParams, loaderId?: number) {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.get<BaseResponse>(url, { params: params, headers: this.headers, observe: 'response' }).toPromise()
      resp.body.statusCode = resp.status;
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    }
  }

  protected async post(url: string, body?: object): Promise<BaseResponse> {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.post<BaseResponse>(url, body, { headers: this.headers, observe: 'response' }).toPromise()
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
      resp.body.statusCode = resp.status;
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    }
  }

  protected async delete(url: string, params?: HttpParams) {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.delete<BaseResponse>(url, { params: params, headers: this.headers, observe: 'response' }).toPromise();
      resp.body.statusCode = resp.status;
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
      Helper.clearStorage();
      this.router.navigate(['/auth']);
    }
    else if (ex.error) {
      let error = ex.error;
      return new BaseResponse(error.code, error.message, ex.status, error.data);
    }
  }
}
