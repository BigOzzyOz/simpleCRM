import { UserInterface } from "../interfaces/user.interface";

export class User {
  firstName: string;
  lastName: string;
  email: string;
  birthday: number | Date | null;
  street: string;
  houseNumber: number | null;
  city: string;
  zip: number | null;

  constructor(obj?: UserInterface) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthday = obj ? (obj.birthday as Date).getTime() : null;
    this.street = obj ? obj.street : '';
    this.houseNumber = obj ? obj.houseNumber : null;
    this.city = obj ? obj.city : '';
    this.zip = obj ? obj.zip : null;
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthday: this.birthday,
      street: this.street,
      houseNumber: this.houseNumber,
      city: this.city,
      zip: this.zip
    }
  }
}
