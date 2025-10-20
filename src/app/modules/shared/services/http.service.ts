import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../../../environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly _httpClient: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this._httpClient.get<T>(url);
  }

  post<T, K>(url: string, body: T): Observable<K> {
    return this._httpClient.post<K>(url, body);
  }

  patch<T, K>(url: string, body: T): Observable<K> {
    return this._httpClient.patch<K>(url, body);
  }

  update<T, K>(url: string, body: T): Observable<K> {
    return this._httpClient.patch<K>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this._httpClient.delete<T>(url);
  }
}
