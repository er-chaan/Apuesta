import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: any;
  constructor(private httpClient: HttpClient) {
    this.api = "http://localhost:3000";
  }

  auth(data: any): Observable<any> {
    return this.httpClient.post<any>(this.api + "/auth", data);
  }
  logout(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/user/logout");
  }
  supportPost(data: any): Observable<any> {
    return this.httpClient.post<any>(this.api + "/support", data);
  }
  supportGetByEmail(email: any): Observable<any> {
    return this.httpClient.get<any>(this.api + "/support/" + email);
  }
  userGetByEmail(email: any): Observable<any> {
    return this.httpClient.get<any>(this.api + "/user/" + email);
  }
  userUpdate(data: any): Observable<any> {
    return this.httpClient.put<any>(this.api + "/user", data);
  }
  transactionsGetByUid(uid: any): Observable<any> {
    return this.httpClient.get<any>(this.api + "/transactions/" + uid);
  }
  notificationsGet(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/notifications");
  }
  cashOut(data: any): Observable<any> {
    return this.httpClient.post<any>(this.api + "/wallet/cashout", data);
  }
  cashIn(data: any): Observable<any> {
    return this.httpClient.post<any>(this.api + "/wallet/cashin", data);
  }

  // pgInitiateTransaction(mid,oid): Observable<any> {
  //   let pgUrl = "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?";
  //   return this.httpClient.post<any>(pgUrl + "mid="+mid+"&orderId="+oid+"",null);
  // }

}
