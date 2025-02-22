import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserAddressComponent } from './dialog-edit-user-address.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment.development';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('DialogEditUserAddressComponent', () => {
  let component: DialogEditUserAddressComponent;
  let fixture: ComponentFixture<DialogEditUserAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogEditUserAddressComponent,
        MatDialogModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        provideAnimationsAsync(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogEditUserAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
