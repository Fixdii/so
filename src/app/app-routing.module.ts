import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'log-in', component: LogInComponent, canActivate: [IsLoggedInGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [IsLoggedInGuard] },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
