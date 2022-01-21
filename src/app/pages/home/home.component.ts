import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TAGS, UIQuestion, UserData, UserRole } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  questions: UIQuestion[];
  userData: UserData;
  TAGS = TAGS;
  toggle = false;
  isMyQuestion = false;
  isSort = false;
  tags = new FormControl();
  isAnswer = new FormControl();
  sortDay = new FormControl();
  private destroy = new Subject<void>();

  constructor(
    private questionsService: QuestionsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getQuestions();

    this.authService.userData.subscribe((data) => {
      this.userData = data;      
      this.sortQuestions();
    });
  }

  toggleDisplay(): void{
    this.toggle = !this.toggle;
  }

  toggleMyQuestion(): void{
    this.isMyQuestion = !this.isMyQuestion;
  }

  getQuestions(): void{
    this.questionsService
      .getQuestions()
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => {
        if (data) {
          this.questions = data;          
          this.sortQuestions();
        }
      });
  }

  sortQuestions(): void {
    if(!this.userData) {      
      return;
    }

    this.questions = this.questions.filter(question=>{
      if(this.userData.role === UserRole.Admin || question.approved || this.userData.email === question.author){
        return true;            
      }  
      return false;
    });
  }

  updateQuestion(): void {
    this.getQuestions();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
