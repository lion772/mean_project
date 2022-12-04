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
  inputText = '';
  inputTitle = '';
  errorMsg = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    if (this.inputText.length === 0 || this.inputTitle.length === 0) {
      this.errorMsg = 'Invalid input(s)';
      return;
    }
    const dataRetrieved = this.postService.addPost(
      this.inputTitle,
      this.inputText
    );
    console.log('Data on post create', dataRetrieved);
    this.router.navigate(['post/post-list']);
  }
}
