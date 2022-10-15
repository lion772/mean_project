import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.paramName = params['name'];
      console.log(this.paramName);
    });
  }

  onSubmit() {
    this.postService.setPost(this.textareaInput);
    this.callServer(this.textareaInput);
  }

  callServer(post: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http
      .post('http://localhost:3000/post', JSON.stringify(post), {
        headers: headers,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
