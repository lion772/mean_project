import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  textareaInput = '';
  inputTitle = '';
  postList: string[] = [];
  paramName: string = '';
  postModel!: PostModel;

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
    this.postService.addPost(this.inputTitle, this.textareaInput);
  }
}
