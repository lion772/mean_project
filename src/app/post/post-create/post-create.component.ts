import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  textareaInput = '';
  postList: string[] = [];
  paramName: string = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.paramName = params['name'];
      console.log(this.paramName);
    });
  }

  onSubmit() {
    this.postService.setPost(this.textareaInput);
  }
}
