import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UserNamePipe } from './core/pipes/user-name.pipe';
import { QuestionForm } from './pages/question-form/question-form.component';
import { QuestionComponent } from './pages/question/question.component';
import { DateSortPipe } from './core/pipes/date-sort.pipe';
import { MyQuestionsPipe } from './core/pipes/my-questions.pipe';
import { QuestionCardComponent } from './core/components/question-card/question-card.component';
import { TagSortPipe } from './core/pipes/tag-sort.pipe';
import { AnswerSortPipe } from './core/pipes/answer-sort.pipe';
import { SortByDayPipe } from './core/pipes/sort-by-day.pipe';
import { AuthService } from './core/services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AuthFormComponent, 
    HomeComponent, 
    UserNamePipe, 
    QuestionCardComponent, 
    QuestionForm, 
    QuestionComponent,
    DateSortPipe,
    MyQuestionsPipe,
    TagSortPipe,
    AnswerSortPipe,
    SortByDayPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
