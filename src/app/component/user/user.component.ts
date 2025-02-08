import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogNewUserComponent } from './dialog-new-user/dialog-new-user.component';
import { UserInterface } from '../../interfaces/user.interface';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  newUser: UserInterface = new User();

  constructor() { }
  dialog = inject(MatDialog);

  openDialogNewUser(): void {
    const dialogRef = this.dialog.open(DialogNewUserComponent, {
      data: this.newUser
    });
  }


}
