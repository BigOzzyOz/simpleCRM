import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getFirestore } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class FsStorageService {
  firestore = inject(Firestore);


  constructor() { }

  async saveUser(user: UserInterface) {
    await addDoc(collection(this.firestore, 'users'), user);
    console.log('User saved successfully!');
    console.log(user);
  }
}
