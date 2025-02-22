import { TestBed } from '@angular/core/testing';

import { FsStorageService } from './fs-storage.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment.development';

describe('FsStorageService', () => {
  let service: FsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore())]
    });
    service = TestBed.inject(FsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
