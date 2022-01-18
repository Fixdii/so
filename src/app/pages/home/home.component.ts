import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TAGS, UIQuestion, UserData, UserRole } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuastionsService } from 'src/app/core/services/quastions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  quastions: UIQuestion[];
  userData: UserData;
  email: string;
  TAGS = TAGS;
  toggle = false;
  isMyQuestion = false;
  isSort = false;
  tags = new FormControl();
  isAnswer = new FormControl();
  sortDay = new FormControl();
  private destroy = new Subject<void>();

  constructor(
    private quastionsService: QuastionsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getQuastions;
    this.authService.userData.subscribe((data) => {
      this.userData = data;            
      this.sortQuestions();
    });
    this.authService.user.subscribe((user) => {
      if(user){
        this.email = user.email; 
      }           
      this.sortQuestions();
    });
  }

  toggleDisplay() {
    this.toggle = !this.toggle;
  }

  toggleMyQuestion() {
    this.isMyQuestion = !this.isMyQuestion;
  }

  get getQuastions() {
    return this.quastionsService
      .getQuastions()
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => {
        if (data) {
          this.quastions = data;
          this.sortQuestions();
        }
      });
  }

  sortQuestions() {
    if(!this.userData) {
      this.quastions = this.quastions?.filter(post=>{
        if(post.approved || this.email === post.author){
          return true;            
        }  
        return false;
      });     
    }else{
      this.quastions = this.quastions?.filter(post=>{
        if(this.userData.role === UserRole.Admin || post.approved || this.email === post.author){
          return true;            
        }  
        return false;
      });
    }  
  }

  updateQuastion(quastions: UIQuestion[]) {
    this.getQuastions;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
