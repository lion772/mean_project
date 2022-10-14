import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostService) {}
  private subscription!: Subscription;
  postList: string[] = [];

  ngOnInit(): void {
    this.subscription = this.postService
      .getPosts()
      .subscribe((posts) => (this.postList = posts));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
