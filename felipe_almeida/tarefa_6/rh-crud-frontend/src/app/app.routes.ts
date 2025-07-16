import { Routes } from '@angular/router';
import { RequestListComponent } from './requests/pages/request-list/request-list.component';
import { RequestFormComponent } from './requests/pages/request-form/request-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'requests', pathMatch: 'full' },
  { path: 'requests', component: RequestListComponent },
  { path: 'requests/new', component: RequestFormComponent },
  { path: 'requests/edit/:id', component: RequestFormComponent },
];
