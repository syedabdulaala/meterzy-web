import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/models/response/base-response';
import { Router } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';


export abstract class BaseService {
  private http: HttpClient;
  private router: Router;
  protected loader: LoaderComponent[] = [];

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
    } finally {
      this.unWatchLoader(loaderId);
    }
  }

  protected async post(url: string, body?: object, loaderId?: number): Promise<BaseResponse> {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.post<BaseResponse>(url, body, { observe: 'response' }).toPromise()
      resp.body.statusCode = resp.status;
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    } finally {
      this.unWatchLoader(loaderId);
    }
  }

  protected async put(url: string, body?: object, loaderId?: number) {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.put<BaseResponse>(url, body, { observe: 'response' }).toPromise()
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    } finally {
      this.unWatchLoader(loaderId);
    }
  }

  protected async delete(url: string, params?: HttpParams, loaderId?: number) {
    try {
      url = environment.baseApiUrl + url;
      const resp = await this.http.delete<BaseResponse>(url, { params: params, observe: 'response' }).toPromise()
      return resp.body;
    } catch (error) {
      return this.handleFailedResponse(error);
    } finally {
      this.unWatchLoader(loaderId);
    }
  }

  protected watchLoader(loader?: LoaderComponent): number {
    if (loader != null && loader != undefined) {
      loader.show();
      return this.loader.push(loader);
    }
    return -1;
  }

  protected isSuccess(resp: BaseResponse): boolean {
    return resp.statusCode === 200;
  }

  private unWatchLoader(loaderId?: number) {
    if (loaderId !== -1 || loaderId !== undefined && loaderId !== null) {
      loaderId -= 1;
      this.loader[loaderId].hide();
      this.loader[loaderId] = null;
    }
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
