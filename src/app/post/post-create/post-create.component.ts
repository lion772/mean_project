import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    const dataRetrieved = this.postService.addPost(
      this.inputTitle,
      this.textareaInput
    );
    console.log('Data on post create', dataRetrieved);
    this.router.navigate(['/post/post-list']);
  }
}
