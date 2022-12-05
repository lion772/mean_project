import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostModel } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  errorMsg = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {}

  onSubmit(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.postService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
    this.router.navigate(['/post/post-list']);
  }
}
