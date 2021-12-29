import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../models';
import { AuthService } from '../../services/auth.service';
import { QuastionsService } from '../../services/quastions.service';

@Component({
  selector: 'app-quastions',
  templateUrl: './quastions.component.html',
  styleUrls: ['./quastions.component.scss']
})
export class QuastionsComponent implements OnInit {
  ROLES = UserRole;

  quastions = this.quastionsService.getQuastions();
  userData = this.authService.userData;

  constructor(
    private quastionsService: QuastionsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  approveQuestion(key: string) {
    this.quastionsService.approveQuestion(key)
  }

}
