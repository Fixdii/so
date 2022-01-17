import { Component, Input, OnInit } from '@angular/core';
import { DBQuestion, UIQuestion, UserRole } from '../../models';
import { AuthService } from '../../services/auth.service';
import { QuastionsService } from '../../services/quastions.service';

@Component({
  selector: 'app-quastion-card',
  templateUrl: './quastion-card.component.html',
  styleUrls: ['./quastion-card.component.scss'],
})

export class QuastionCardComponent implements OnInit {  
  @Input() toggle: boolean = false;
  @Input() post: UIQuestion;


  ROLES = UserRole;
  quastions: UIQuestion[];

  userData = this.authService.userData;
  user = this.authService.user;

  constructor(
    private quastionsService: QuastionsService,
    private authService: AuthService
  ) {
    this.getQuastions;   
  }

  get getQuastions() {
    return this.quastionsService.getQuastions().subscribe((data) => {
      if(data){
        this.quastions = data;      
      }
    });
  }

  ngOnInit(): void {}

  approveQuestion(key: string) {
    this.quastionsService
      .approveQuestion(key)
      .subscribe((res) => {
        if(res){
          this.getQuastions;
        }
      });
  }

  deleteQuestion(key: string) {
    this.quastionsService
    .deleteQuestion(key)
    .subscribe((res) => {
      if(res){
        this.getQuastions;
      }
    });   
  }
}
