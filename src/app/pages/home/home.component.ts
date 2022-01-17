import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TAGS, UIQuestion } from 'src/app/core/models';
import { QuastionsService } from 'src/app/core/services/quastions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  quastions: UIQuestion[];
  TAGS = TAGS;
  toggle = false;
  isMyQuestion = false;
  isSort = false;
  tags = new FormControl();
  isAnswer = new FormControl();
  sortDay = new FormControl();
  private destroy = new Subject<void>();


  constructor(private quastionsService: QuastionsService) {
    this.getQuastions;
  }
 
  ngOnInit(): void {}

  toggleDisplay() {
    this.toggle = !this.toggle;        
  }

  toggleMyQuestion() {
    this.isMyQuestion = !this.isMyQuestion;
  }

  get getQuastions() {
    return this.quastionsService.getQuastions().pipe(takeUntil(this.destroy)).subscribe((data) => {
      if (data) {
        this.quastions = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
