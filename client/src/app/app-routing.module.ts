import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'auth', loadChildren: () => AuthModule},
  {path: '', loadChildren: () => DashboardModule, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
