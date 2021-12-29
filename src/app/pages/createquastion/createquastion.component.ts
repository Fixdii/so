import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BDQuestion, TAGS } from 'src/app/core/models';
import { QuastionsService } from 'src/app/core/services/quastions.service';

@Component({
  selector: 'app-createquastion',
  templateUrl: './createquastion.component.html',
  styleUrls: ['./createquastion.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  TAGS = TAGS;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,private quastionsService: QuastionsService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['',  Validators.required ],
      text: [ '', Validators.required ],
      tag: ['', Validators.required]
    });
  }

  submit(){
    const question: BDQuestion = {
      approved: false,
      ...this.formGroup.value
    };
    question.dateOfCreation = +new Date();
    this.quastionsService.sendQuastion(question);  

    this.quastionsService.getQuastions();
  }

}
