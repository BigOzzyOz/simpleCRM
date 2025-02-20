import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from '../../../interfaces/user.interface';
import { User } from '../../../models/user.class';
import { FsStorageService } from '../../../services/fs-storage.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatAccordion, MatExpansionModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnDestroy, OnInit {
  route = inject(ActivatedRoute);
  storage = inject(FsStorageService);
  private cdr = inject(ChangeDetectorRef);

  accordion = viewChild.required(MatAccordion);
  private destroy$ = new Subject<void>();

  userId: string = '';
  loadingSpinner: boolean = false;
  selectedUser: UserInterface = new User();

  constructor() { }

  ngOnInit(): void {
    this.loadingSpinner = true;
    this.userId = this.route.snapshot.params['id'];

    this.storage.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.selectedUser = users.find(user => user.id === this.userId)!;
        this.loadingSpinner = this.selectedUser ? false : true;
        this.cdr.detectChanges();
      });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  sendMail(email: string): void {
    const link = document.createElement('a');
    link.href = 'mailto:' + email;
    this.openLink(link);
  }


  callPhone(phone: string): void {
    const link = document.createElement('a');
    link.href = 'tel:' + phone;
    this.openLink(link);
  }


  openLink(link: HTMLAnchorElement): void {
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  getAge(birthday: number | Date | null): string {
    if (birthday) {
      const today = new Date().getTime();
      const birthDate = new Date(birthday).getTime();
      const age = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 365.25));
      return age.toString();
    } else {
      return '';
    }
  }

  getDate(birthday: number | Date | null): string {
    if (birthday) {
      return new Date(birthday).toLocaleDateString();
    } else {
      return '';
    }
  }
}
