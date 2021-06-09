export interface User {
    id?:number,
    firstName: string,
    middleName: string,
    lastName: string,
    email:string,
    phoneNumber: number,
    role:string,
    address:string,
    createdOn:string,
    updatedOn:string,
    isEdit?:boolean,
}