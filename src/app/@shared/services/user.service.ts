import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "../types/User";
import { User } from "../model/User";
import { USERS } from "../mock-data/mock-users";
import { CrudService } from "./crud.service";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User,number> {
  base =`${environment.baseUrl}/users`;
 constructor(protected _http:HttpClient){
    super(_http, `${environment.baseUrl}/users`);
 }

 findAll(): Observable<User[]> {
  return this._http.get<User[]>(this.base)
  .pipe(
    map((data: any[]) =>
      data.map(
        (item: any) => new User(item)
      )
    )
  );
}

findOne(id: number): Observable<User> {
  return this._http.get<User>(this.base + "/" + id).pipe(
    map((data: any) =>
      new User(data)
      )
    );
  }

}
