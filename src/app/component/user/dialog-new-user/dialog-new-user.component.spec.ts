import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewUserComponent } from './dialog-new-user.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment.development';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('DialogNewUserComponent', () => {
  let component: DialogNewUserComponent;
  let fixture: ComponentFixture<DialogNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogNewUserComponent,
        MatDialogModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        provideAnimationsAsync(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
