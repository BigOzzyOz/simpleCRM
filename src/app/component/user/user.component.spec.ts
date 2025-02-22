import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { environment } from '../../../environments/environment.development';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserComponent,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
