import { Routes } from '@angular/router';
import { ContactComponent } from './component/contact/contact.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user.component';
import { UserDetailsComponent } from './component/user/user-details/user-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'contact', component: ContactComponent }
];
