// import { HttpClient } from '@angular/common/http';
import { httpClient } from './http-client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList = environment.backend+"user";
  private user = environment.backend+"user/";
  private updateuser = environment.backend+"user/";
  private uploadUrl = environment.backend+'user';
  private deleteUrl = environment.backend+'user/';
  constructor(private http: httpClient) { }

  getUser():Observable<any>{
    return this.http.get(this.userList)
  }

  getSingleUser(id:string):Observable<any>{
    return this.http.get(this.user+id);
  }

  RegisterUser(obj:any): Observable<any>{
    return this.http.post(this.uploadUrl, obj)
  }

  UpdateUser(id:string,obj:any): Observable<any>{
    return this.http.put(this.updateuser+id, obj)
  }

  deleteUser(id:string){
    return this.http.delete(this.deleteUrl+id)
  }
}
