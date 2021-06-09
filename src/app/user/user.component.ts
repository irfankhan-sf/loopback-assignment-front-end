import { Component, OnInit } from '@angular/core';
import { User } from '../@shared/types/User';
import { UserService } from "../@shared/services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users:User[] = [];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe( users =>{
      users.forEach(user=>{
        user.isEdit = false;
      });
      this.users = users;
    })
  }

}
