import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { CreateQuestionComponent } from './pages/createquastion/createquastion.component';
import { QuastionComponent } from './pages/quastion/quastion.component';

const routes: Routes = [
  { path: 'log-in', component: AuthFormComponent, canActivate: [IsLoggedInGuard] },
  { path: 'sign-up', component: AuthFormComponent, canActivate: [IsLoggedInGuard] },
  { path: 'createquastion', component: CreateQuestionComponent },
  { path: 'quastion/:id', component: QuastionComponent },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
