import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  async signOut(): Promise<void>{
    await this.authService.signOut();
    await this.router.navigate([PATHS.LOG_IN]);
  }
}
