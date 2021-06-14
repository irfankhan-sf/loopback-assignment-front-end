import { Role } from "./Role";
export interface User {
    id:number,
    firstName: string,
    middleName: string,
    lastName: string,
    email:string,
    phoneNumber: number,
    role:Role,
    address:string,
    createdOn:string,
    updatedOn:string,
    isEdit?:boolean,
}

export interface UserError {
    firstName: string,
    middleName: string,
    lastName: string,
    email:string,
    phoneNumber: string,
    role:string,
    address:string,
    isValid:boolean,
}