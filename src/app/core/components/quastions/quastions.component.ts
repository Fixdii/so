import { Component, Input, OnInit } from '@angular/core';
import { DBQuestion, UIQuestion, UserRole } from '../../models';
import { AuthService } from '../../services/auth.service';
import { QuastionsService } from '../../services/quastions.service';

@Component({
  selector: 'app-quastions',
  templateUrl: './quastions.component.html',
  styleUrls: ['./quastions.component.scss'],
})
export class QuastionsComponent implements OnInit {  
  @Input() toggle: boolean = false;


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
