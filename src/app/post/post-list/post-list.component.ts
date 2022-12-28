import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { PostModel } from '../post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  postList?: PostModel[] | null = [];
  postFound?: PostModel | undefined;
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  //Params
  title!: string | undefined;
  content!: string | undefined;

  constructor(public postService: PostService, private router: Router) {}

  ngOnInit() {
    this.postService.isLoading$.subscribe((isLoading) => {
      console.log(isLoading);
      this.isLoading = isLoading;
    });
    this.postService.getPosts();
    this.postService.postlistUpdated$.subscribe({
      next: (pipedPosts) => (this.postList = pipedPosts),
      error: (err) => console.log(err.message),
    });
  }

  onClick(id: string) {
    this.postFound = this.postService.getPost(id);
    if (this.postFound) {
      this.title = this.postFound['title'];
      this.content = this.postFound['content'];
      this.router.navigate([`/post/post-detail/${id}`]);
    } else {
      throw new Error('No post found');
    }
  }

  saveInLocalStorage(): void {
    if (this.title && this.content) {
      localStorage.setItem('title', this.title);
      localStorage.setItem('content', this.content);
    }
  }

  onChangePage(pageEvent: PageEvent) {

  }
}
