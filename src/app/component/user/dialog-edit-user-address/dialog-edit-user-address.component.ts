import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../../models/user.class';
import { FsStorageService } from '../../../services/fs-storage.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserInterface } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-dialog-edit-user-address',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatProgressBarModule],
  templateUrl: './dialog-edit-user-address.component.html',
  styleUrl: './dialog-edit-user-address.component.scss'
})
export class DialogEditUserAddressComponent {
  storage = inject(FsStorageService);
  userId: string = '';
  user = new User();
  originalUser = new User();
  public dialogRef: MatDialogRef<DialogEditUserAddressComponent> = inject(MatDialogRef);



  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public userData: UserInterface) {
    this.userId = userData.id!;
    this.user = new User(userData);
    this.originalUser = new User(userData);
    this.originalUser.birthday = this.originalUser.birthday ? new Date(this.originalUser.birthday).getTime() : null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(userId: string): void {
    this.loading = true;
    this.user.birthday = (this.user.birthday as Date).getTime();
    const updatedFields = Object.entries(this.user).reduce((changes, [key, value]) => {
      if (value !== (this.originalUser as any)[key]) (changes as any)[key] = value;
      return changes;
    }, {} as Partial<UserInterface>);
    if (Object.keys(updatedFields).length === 0) this.dialogRef.close();
    if (Object.keys(updatedFields).length > 0) this.storage.editUser(userId!, updatedFields)
      .then(() => this.dialogRef.close());
  }
}
