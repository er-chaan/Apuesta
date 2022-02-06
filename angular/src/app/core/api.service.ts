import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api:any;
  constructor(private httpClient: HttpClient) {
    this.api = "http://localhost:3000";
  }
  // auth(): Observable<any>{
  //   return this.httpClient.get<any>(this.api+"/auth");
  // }
  auth(data:any){
    return this.httpClient.post<any>(this.api+"/auth",data);
  }
  logout(){
    return this.httpClient.get<any>(this.api+"/user/logout");
  }

}
