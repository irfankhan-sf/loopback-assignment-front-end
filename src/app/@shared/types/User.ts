import { Role } from "./Role";
export interface IUser {
    id:number,
    first_name: string,
    middle_name: string,
    last_name: string,
    email:string,
    phone_number: number,
    role:Role,
    address:string,
    created_at:string,
    updated_at:string,
    isEdit?:boolean,
}

export interface IUserError {
    first_name: string,
    middle_name: string,
    last_name: string,
    email:string,
    phone_number: string,
    role:string,
    address:string,
    isValid:boolean,
}

