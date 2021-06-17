import { DateTimeDecorator } from "../decorators/date-time.decorator";
import { IUser } from "../types/User";

export class User implements IUser {
    public id;
    public first_name;
    public middle_name;
    public last_name;
    public email;
    public phone_number;
    public role;
    public address;
    public isEdit :boolean | undefined= false;
    @DateTimeDecorator('MMM d, y, h:mm:ss a')
    public created_at;
    @DateTimeDecorator('MMM d, y, h:mm:ss a')
    public updated_at;

    constructor(user: IUser) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.middle_name = user.middle_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.phone_number = user.phone_number;
        this.role = user.role;
        this.address = user.address;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
        this.isEdit = user.isEdit;
    }
}