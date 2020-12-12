import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MyCookiesService } from '@common/services/my-cookies.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient,
              private myCookiesService: MyCookiesService) {
  }

  post(url, body): Observable<any> {
    return this.http.post<any>(url, body, this.setOptions());
  }

  get(url, params): Observable<any> {
    return this.http.get<any>(url, this.setOptions(params));
  }

  setOptions(params?: HttpParams | { [param: string]: string | string[]; }): any {
    const option: {
      headers?: HttpHeaders | { [header: string]: string | string[]; };
      observe?: 'events';
      params?: HttpParams | { [param: string]: string | string[]; };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    } = {};
    option.headers = new HttpHeaders().set('Accept', '*/*');

    const token = this.myCookiesService.get('token');
    if (token) {
      option.headers = option.headers.set('Authorization', `Bearer ${ token }`);
    }
    if (params) {
      option.params = params;
    }
    return option;
  }
}
