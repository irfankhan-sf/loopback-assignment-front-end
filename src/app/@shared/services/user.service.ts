import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { User } from "../types/User";
import { USERS } from "../mock-data/mock-users";
import { CrudService } from "./crud.service";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User,number> {

 constructor(protected _http:HttpClient){
    super(_http, `${environment.baseUrl}/users`);
 }

  // findAll():Observable<User[]>{
  //   return of(USERS)
  // }
}
