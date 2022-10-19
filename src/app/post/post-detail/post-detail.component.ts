import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postId!: string;
  title!: string;
  content!: string;
  postFound: any;
  isEditable: boolean = false;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(map((data) => data['id']))
      .subscribe((retrievedData) => {
        this.postId = retrievedData;
      });

    this.route.params
      .pipe(map((data) => data['title']))
      .subscribe((retrievedData) => {
        this.title = retrievedData;
      });

    this.route.params
      .pipe(map((data) => data['content']))
      .subscribe((retrievedData) => {
        this.content = retrievedData;
      });

    //this.postFound = this.postService.getPost(String(this.postId));
    //this.title = this.postFound['title'];
    //this.content = this.postFound['content'];
  }

  onUpdatePost() {
    this.postService.updatePost(this.postId, this.title, this.content);
    this.router.navigate(['/post/post-list']);
  }

  onDeletePost = async () => {
    const isPostDeleted = await this.postService.deletePost(this.postId);
    this.router.navigate(['/post/post-list']);
  };
}
