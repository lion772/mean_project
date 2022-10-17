import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  postList: PostModel[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postList = this.postService.getPosts();

    this.subscription = this.postService
      .getPostUpdatedListener()
      .subscribe((posts: any) => {
        this.postList = [...posts];
        console.log(posts);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {}
}
