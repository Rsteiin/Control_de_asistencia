import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private headers = new HttpHeaders().set("x-access-token",`${JSON.parse(localStorage.getItem('user')||'{}').token}`);
  constructor(
    private http: HttpClient,
  ) { }
}
