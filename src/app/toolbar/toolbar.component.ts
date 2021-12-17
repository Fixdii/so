import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isAuthorised = false;
  isOpen = false;
  user: any;

  constructor(
    public dialog: MatDialog,
    public authService: AuthServiceService
  ) {}

  openDialog(): void {
    if (!this.isAuthorised) {
      const dialogRef = this.dialog.open(AuthFormComponent, {
        width: '500px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.authService.isAuthUserSubj.next(true);
        }
      });
    } else {
      this.authService.isAuthUserSubj.next(false);
    }
  }

  receiveUser() {
    console.log(this.authService.userData);    
  }

  ngOnInit(): void {
    this.authService.isAuthUserSubj.subscribe((res) => {
      this.isAuthorised = res;
    });
  }
}
