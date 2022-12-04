import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { PostModel } from '../post.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  postId!: string;
  postList: any = [];
  postFound: any;
  title!: string;
  content!: string;

  constructor(public postService: PostService, private router: Router) {}

  ngOnInit() {
    this.postService.getPosts();
    this.postService.postlistUpdated$.subscribe({
      next: (pipedPosts) => (this.postList = pipedPosts),
      error: (err) => console.log(err.message),
    });
  }

  onClick(id: string) {
    this.postId = id;
    this.postFound = this.postService.getPost(this.postId);
    if (this.postFound) {
      this.title = this.postFound['title'];
      this.content = this.postFound['content'];
      console.log(id, this.title, this.content);
      this.router.navigate([
        `/post/post-detail/${this.postId}/${this.title}/${this.content}`,
      ]);
    } else {
      throw new Error('No post found');
    }
  }

  saveInLocalStorage(): void {
    localStorage.setItem('title', this.title);
    localStorage.setItem('content', this.content);
  }
}
