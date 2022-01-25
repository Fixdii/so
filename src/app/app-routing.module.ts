import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { QuestionForm } from './pages/question-form/question-form.component';
import { QuestionComponent } from './pages/question/question.component';
import { PATHS } from './core/models';

const routes: Routes = [
  { path: PATHS.LOG_IN , component: AuthFormComponent, canActivate: [IsLoggedInGuard] },
  { path: PATHS.SIGN_UP, component: AuthFormComponent, canActivate: [IsLoggedInGuard] },
  { path: PATHS.CREATE_QESTION, component: QuestionForm, canActivate: [AuthGuard] },
  { path: `${PATHS.EDIT_QESTION}/:id`, component: QuestionForm },
  { path: `${PATHS.QUESTION}/:id`, component: QuestionComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
