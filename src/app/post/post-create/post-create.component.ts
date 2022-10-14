import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  value = '';
  textareaInput = '';
  constructor() {}

  ngOnInit(): void {}

  onSubmit(input: HTMLTextAreaElement) {
    console.log(input.value);
  }
}
