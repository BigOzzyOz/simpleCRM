import { inject, Injectable, OnDestroy } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FsStorageService implements OnDestroy {
  firestore = inject(Firestore);
  private destroy$ = new Subject<void>();

  // Add observable data stream
  private usersSubject = new BehaviorSubject<UserInterface[]>([]);
  users$ = this.usersSubject.asObservable();

  // Store the unsubscribe function
  private unsubSnapshot!: () => void;

  constructor() {
    this.initUsersListener();
  }

  private initUsersListener() {
    // Convert snapshot to observable pattern
    this.unsubSnapshot = onSnapshot(
      collection(this.firestore, 'users'),
      (querySnapshot) => {
        const users = querySnapshot.docs.map(doc => ({
          ...doc.data() as UserInterface,
          id: doc.id // Add this if you need document IDs
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

  // Cleanup
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.unsubSnapshot) this.unsubSnapshot();
  }
}
