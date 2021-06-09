import { Component, OnInit } from '@angular/core';
import { User } from '../@shared/types/User';
import { UserService } from "../@shared/services/user.service";
import { faEdit, faTimes, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users:User[] = [];
  editUserData : { [userId: number]: User }={}
  faEdit=faEdit;
  faTimes=faTimes;
  faTrashAlt=faTrashAlt;
  faSave=faSave;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe( users =>{
      users.forEach(user=>{
        user.isEdit = false;
      });
      this.users = users;
    })
  }

  onEdit(user: User):void{
    this.editUserData[user.id]={...user};
    user.isEdit = true;
  }

  onCancelEdit(user: User):void{
    delete this.editUserData[user.id];
    user.isEdit = false;
  }

  onDelete(user: User):void{
    this.users = this.users.filter(currUser=> currUser.id !== user.id);
  }

  onSave(user: User):void{
    Object.assign(user, this.editUserData[user.id]);
    user.isEdit = false;
  }

}
