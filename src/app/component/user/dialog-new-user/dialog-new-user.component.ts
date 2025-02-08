import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserInterface } from '../../../interfaces/user.interface';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../../models/user.class';
import { FsStorageService } from '../../../services/fs-storage.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@Component({
  selector: 'app-dialog-new-user',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatProgressBarModule],
  templateUrl: './dialog-new-user.component.html',
  styleUrl: './dialog-new-user.component.scss'
})
export class DialogNewUserComponent {
  storage = inject(FsStorageService);
  dialogRef = inject(MatDialogRef);
  user = new User();
  loading: boolean = false;
  formCheck;

  constructor() {
    this.formCheck = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      birthday: new FormControl(null, [Validators.required,]),
      street: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      houseNumber: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      zip: new FormControl()
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(): void {
    this.loading = true;
    this.user.birthday = (this.user.birthday as Date).getTime();
    console.log(this.user as UserInterface);
    this.storage.saveUser(this.user.toJSON()).then(() => this.dialogRef.close());
  }
}
