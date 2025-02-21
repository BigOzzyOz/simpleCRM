import { inject, Injectable, OnDestroy } from '@angular/core';
import { addDoc, collection, doc, Firestore, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FsStorageService implements OnDestroy {
  firestore = inject(Firestore);
  private destroy$ = new Subject<void>();

  private usersSubject = new BehaviorSubject<UserInterface[]>([]);
  users$ = this.usersSubject.asObservable();

  private unsubSnapshot!: () => void;

  constructor() {
    this.initUsersListener();
  }

  private initUsersListener() {
    this.unsubSnapshot = onSnapshot(
      collection(this.firestore, 'users'),
      (querySnapshot) => {
        const users = querySnapshot.docs.map(doc => ({
          ...doc.data() as UserInterface,
          id: doc.id
        }));
        this.usersSubject.next(users);
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.usersSubject.next([]);
      }
    );
  }

  async saveUser(user: UserInterface) {
    try {
      await addDoc(collection(this.firestore, 'users'), user);
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }


  async editUser(userId: string, updatedFields: Partial<UserInterface>) {
    const docRef = doc(collection(this.firestore, 'users'), userId);
    try {
      await updateDoc(docRef, updatedFields);
    } catch (error) {
      console.error('Error editing user:', error);
      throw error;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.unsubSnapshot) this.unsubSnapshot();
  }
}
