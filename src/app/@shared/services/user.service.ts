import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { User } from "../types/User";
import { USERS } from "../mock-data/mock-users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers():Observable<User[]>{
    return of(USERS)
  }
}
