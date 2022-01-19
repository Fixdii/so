import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UIQuestion, UserRole } from '../../models';
import { AuthService } from '../../services/auth.service';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit, OnDestroy {
  @Input() toggle: boolean = false;
  @Input() post: UIQuestion;
  @Output() onChanged = new EventEmitter< UIQuestion[]>();

  ROLES = UserRole;
  questions: UIQuestion[];
  private destroy = new Subject<void>();

  userData = this.authService.userData;
  user = this.authService.user;

  constructor(
    private questionsService: QuestionsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

  approveQuestion(key: string): void{
    this.questionsService
      .approveQuestion(key)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.onChanged.emit([]);  
        }
      });
  }

  deleteQuestion(key: string): void{
    this.questionsService
      .deleteQuestion(key)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.onChanged.emit([]);                      
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
