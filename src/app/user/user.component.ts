import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { faEdit, faTimes, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

import { IUser,IUserError } from '../@shared/types/User';
import { UserService } from "../@shared/services/user.service";
import { Role } from "../@shared/types/Role";
import { DateTimeDecorator } from "../@shared/decorators/date-time.decorator";
import { User } from '../@shared/model/User';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users:IUser[] = [];
  editUserData : { [userId: number]: IUser }={}
  userErrorMsg : { [userId: number]: IUserError }={}
  addUserData?:IUser;
  faEdit=faEdit;
  faTimes=faTimes;
  faTrashAlt=faTrashAlt;
  faSave=faSave;
  role= Role;
  constructor(
    private userService:UserService,
    private datePipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.findAll().subscribe( users =>{
      this.users = users;
    })
  }

  onAdd():void{
    const user= new User({
      id: 0,
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      role:0,
      address: '',
      created_at: this.datePipe.transform(new Date(),"YYYY-MM-ddTHH:mm:ssZ") || "",
      updated_at: this.datePipe.transform(new Date(),"YYYY-MM-ddTHH:mm:ssZ") || "",
    });
    
    this.editUserData[0]={...user};
    this.addUserData =user;
  }

  onCancelAdd():void{
    delete this.userErrorMsg[0];
    delete this.editUserData[0];
    this.addUserData=undefined;
  }

  onSave(){
    let addUser:any = this.editUserData[0]
    addUser.updated_at = this.datePipe.transform(new Date(),"YYYY-MM-ddTHH:mm:ssZ") || "";
    addUser.created_at = this.datePipe.transform(new Date(),"YYYY-MM-ddTHH:mm:ssZ") || "";
    addUser.role = Number(addUser.role);
    delete addUser.id;
    delete addUser.isEdit;
    this.userService.save(addUser).subscribe( users =>{
      this.getUser();
      this.onCancelAdd();
    })
  }

  onEdit(user: IUser):void{
    this.editUserData[user.id]={...user};
    user.isEdit = true;
  }

  onCancelEdit(user: IUser):void{
    delete this.editUserData[user.id];
    delete this.userErrorMsg[user.id];
    user.isEdit = false;
  }

  onDelete(user: IUser):void{
    this.userService.delete(user.id).subscribe( success=>{
      this.getUser();
    })
    // this.users = this.users.filter(currUser=> currUser.id !== user.id);
  }

  onUpdate(user: IUser):void{
    let updateUser:any = this.editUserData[user.id]
    updateUser.updated_at = this.datePipe.transform(new Date(),"YYYY-MM-ddTHH:mm:ssZ") || "";
    delete updateUser.id;
    delete updateUser.isEdit;
    this.userService.update(user.id,updateUser).subscribe( users =>{
      console.log(users);
      Object.assign(user, this.editUserData[user.id]);
      user.isEdit = false;
    })
  }

  validateInput(user: IUser): void{
    const errorMsg:IUserError = {
      first_name: "",
      middle_name: "",
      last_name: "",
      email:"",
      phone_number: "",
      role:"",
      address:"",
      isValid:true,
    }
    let isValid = true 
    if (this.isEmpty(user.first_name.trim())) {
      errorMsg.first_name = "First name is required";
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

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


}
