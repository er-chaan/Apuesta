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
  boardGet(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/board");
  }
  boardGetByStatus(status: any): Observable<any> {
    return this.httpClient.get<any>(this.api + "/board/status/" + status);
  }
  cashOut(data: any): Observable<any> {
    return this.httpClient.post<any>(this.api + "/wallet/cashout", data);
  }
  cashIn(data: any): Observable<any> {
    return this.httpClient.post<any>(this.api + "/wallet/cashin", data);
  }
  placeBet(data: any): Observable<any> {
    return this.httpClient.post<any>(this.api + "/bets", data);
  }
  betsGetByUid(uid: any): Observable<any> {
    return this.httpClient.get<any>(this.api + "/bets/" + uid);
  }

  // admin
  getTotalUsers(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/users/total");
  }
  getTotalOnlineUsers(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/users/online");
  }
  getTotalBalanceUsers(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/users/balance");
  }
  getTotalBalanceBookie(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/bookie/balance");
  }
  getTotalBalanceJolo(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/jolo/balance");
  }
  getUsersList(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/users/list");
  }
  updateUserStatus(data: any): Observable<any> {
    return this.httpClient.put<any>(this.api + "/admin/users/status", data);
  }
  getNotificationsList(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/notifications/list");
  }
  deleteNotification(data): Observable<any> {
    return this.httpClient.delete<any>(this.api + "/admin/notifications/delete/" + data.id);
  }
  createNotification(data): Observable<any> {
    return this.httpClient.post<any>(this.api + "/admin/notifications/create", data);
  }
  getBetsList(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/bets/list");
  }
  getSupportList(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/support/list");
  }
  getBoardList(): Observable<any> {
    return this.httpClient.get<any>(this.api + "/admin/board/list");
  }
  supportUpdate(data: any): Observable<any> {
    return this.httpClient.put<any>(this.api + "/admin/support/update/"+data.id, data);
  }

}
