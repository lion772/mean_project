import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  textareaInput = '';
  postList: string[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.postService.setPost(this.textareaInput);
  }
}
