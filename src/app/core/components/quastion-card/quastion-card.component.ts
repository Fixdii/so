import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UIQuestion, UserRole } from '../../models';
import { AuthService } from '../../services/auth.service';
import { QuastionsService } from '../../services/quastions.service';

@Component({
  selector: 'app-quastion-card',
  templateUrl: './quastion-card.component.html',
  styleUrls: ['./quastion-card.component.scss'],
})
export class QuastionCardComponent implements OnInit, OnDestroy {
  @Input() toggle: boolean = false;
  @Input() post: UIQuestion;
  @Output() onChanged = new EventEmitter< UIQuestion[]>();

  ROLES = UserRole;
  quastions: UIQuestion[];
  private destroy = new Subject<void>();

  userData = this.authService.userData;
  user = this.authService.user;

  constructor(
    private quastionsService: QuastionsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

  approveQuestion(key: string) {
    this.quastionsService
      .approveQuestion(key)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.onChanged.emit([]);  
        }
      });
  }

  deleteQuestion(key: string) {
    this.quastionsService
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
