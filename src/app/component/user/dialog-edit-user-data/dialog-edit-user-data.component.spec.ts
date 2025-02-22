import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserDataComponent } from './dialog-edit-user-data.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment.development';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('DialogEditUserDataComponent', () => {
  let component: DialogEditUserDataComponent;
  let fixture: ComponentFixture<DialogEditUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogEditUserDataComponent,
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

    fixture = TestBed.createComponent(DialogEditUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
