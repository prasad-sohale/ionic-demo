import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
const baseApiUrl = 'http://localhost:4001/api/v1';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAccessToken() {
    let token = '';
    if (
      localStorage.getItem('employerData') != null &&
      localStorage.getItem('employerData') != undefined
    ) {
      let employerData = localStorage.getItem('employerData') || '{}';
      const myData = JSON.parse(employerData);
      token = myData.token;
    }
    return token;
  }

  saveRegisterData(registerDataObj: any): Observable<any> {
    return this.http.post(baseApiUrl + '/user', registerDataObj);
  }

  saveLoginData(loginObject: any): Observable<any> {
    return this.http.post(baseApiUrl + '/login', loginObject);
  }

  updateRegisterData(dataId: any, registerDataObj: any): Observable<any> {
    return this.http.put(baseApiUrl + '/user/' + dataId, registerDataObj, {
      headers: { 'x-access-token': this.getAccessToken() },
    });
  }

  getDataById(dataId: any): Observable<any> {
    return this.http.get(baseApiUrl + '/user?id=' + dataId, {
      headers: { 'x-access-token': this.getAccessToken() },
    });
  }

  getAllData(): Observable<any> {
    console.log(123);
    return this.http.get(baseApiUrl + '/user', {
      headers: { 'x-access-token': this.getAccessToken() },
    });
  }

  deleteMyData(dataId: any): Observable<any> {
    return this.http.delete(baseApiUrl + '/user/' + dataId, {
      headers: { 'x-access-token': this.getAccessToken() },
    });
  }
}
