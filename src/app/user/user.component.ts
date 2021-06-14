import { Component, OnInit } from '@angular/core';
import { User,UserError } from '../@shared/types/User';
import { UserService } from "../@shared/services/user.service";
import { faEdit, faTimes, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { Role } from "../@shared/types/Role";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users:User[] = [];
  editUserData : { [userId: number]: User }={}
  userErrorMsg : { [userId: number]: UserError }={}
  faEdit=faEdit;
  faTimes=faTimes;
  faTrashAlt=faTrashAlt;
  faSave=faSave;
  role= Role;
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
    delete this.userErrorMsg[user.id];
    user.isEdit = false;
  }

  onDelete(user: User):void{
    this.users = this.users.filter(currUser=> currUser.id !== user.id);
  }

  onSave(user: User):void{
    Object.assign(user, this.editUserData[user.id]);
    user.isEdit = false;
  }

  validateInput(user: User): void{
    const errorMsg:UserError = {
      firstName: "",
      middleName: "",
      lastName: "",
      email:"",
      phoneNumber: "",
      role:"",
      address:"",
      isValid:true,
    }
    let isValid = true 
    if (this.isEmpty(user.firstName.trim())) {
      errorMsg.firstName = "First name is required";
      isValid = false; 
    }
    if (this.isEmpty(user.email.trim())) {
      errorMsg.email = "Email is required"
      isValid = false; 
    }else if (!this.validateEmail(user.email.trim())) {
      errorMsg.email = "Email is invalid"
      isValid = false; 
    } 
    if (!this.role[user.role]) {
      errorMsg.role = "role is required"
      isValid = false; 
    }
    errorMsg.isValid = isValid;
    this.userErrorMsg[user.id]=errorMsg;

  }

  isEmpty(data:any){
    return (!data || data == "")
  }

  validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(String(email).toLowerCase());
    return result;
  }


}
