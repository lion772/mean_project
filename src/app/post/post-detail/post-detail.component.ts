import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postId!: string;
  title!: string;
  content!: string;
  isEditable: boolean = false;
  isLoading = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
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
  }

  onUpdatePost() {
    this.postService.updatePost(this.postId, this.title, this.content);
    this.router.navigate(['/post/post-list']);
  }

  onDeletePost = () => {
    this.postService.deletePost(this.postId);
    this.router.navigate(['/post/post-list']);
  };
}
