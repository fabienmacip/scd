import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecetteComponent } from './recette/recette.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'recettes', component: RecetteComponent },
/*   { path: 'dashboard/:id', component: DashboardComponent }, */
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
