export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: number | Date | null;
  street: string;
  houseNumber: number | null;
  city: string;
  zip: number | null;
  id?: string;
}
