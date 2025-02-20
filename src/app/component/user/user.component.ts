import { AfterViewInit, Component, inject, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FsStorageService } from '../../services/fs-storage.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements AfterViewInit, OnDestroy {
  dialog = inject(MatDialog);
  storage = inject(FsStorageService);
  private cdr = inject(ChangeDetectorRef);
  newUser: UserInterface = new User();
  loadingSpinner: boolean = false;
  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['lastName', 'firstName', 'birthday', 'city', 'email'];
  dataSource: MatTableDataSource<UserInterface> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadingSpinner = true;

    this.storage.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.dataSource.data = users;
        this.loadingSpinner = users.length > 0 ? false : true;
        this.cdr.detectChanges();
      });
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  openDialogNewUser(): void {
    const dialogRef = this.dialog.open(DialogNewUserComponent, {
      data: this.newUser
    });

    dialogRef.afterClosed().subscribe(() => this.newUser = new User());
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getBirthday(birthday: number): string {
    return birthday ? new Date(birthday).toLocaleDateString() : '';
  }


  editUser(user: UserInterface): void {
    console.log(user);
  }
}
