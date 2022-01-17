import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TAGS, UIQuestion } from 'src/app/core/models';
import { QuastionsService } from 'src/app/core/services/quastions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quastions: UIQuestion[];
  TAGS = TAGS;
  toggle = false;
  isMyQuestion = false;
  isSort = false;
  tags = new FormControl();
  isAnswer = new FormControl();
  sortDay = new FormControl();

  constructor(private quastionsService: QuastionsService) {
    this.getQuastions;
  }

  ngOnInit(): void {}

  toggleDisplay() {
    this.toggle = !this.toggle;
    console.log(this.sortDay.value);
    
  }

  toggleMyQuestion() {
    this.isMyQuestion = !this.isMyQuestion;
  }

  get getQuastions() {
    return this.quastionsService.getQuastions().subscribe((data) => {
      if (data) {
        this.quastions = data;
      }
    });
  }
}
