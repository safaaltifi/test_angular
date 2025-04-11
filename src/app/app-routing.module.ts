import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ListEventComponent } from './components/list-event/list-event.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/list-event', pathMatch: 'full' },
  { path: 'add-event', component: AddEventComponent },
  { path: 'list-event', component: ListEventComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
