import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  postId!: string;
  title?: string | undefined;
  content?: string | undefined;
  imagePath?: string | undefined;

  post!: PostModel | undefined;
  isEditable: boolean = false;
  isLoading = false;
  subscription!: Subscription;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );

    this.postService.getPosts();
    this.subscription = this.postService.postlistUpdated$.subscribe({
      next: (postList) => {
        this.route.params.pipe(map((data) => data['id'])).subscribe((id) => {
          this.postId = id;
          this.post = postList?.find((p: PostModel) => p.id === id);
          this.title = this.post?.title;
          this.content = this.post?.content;
          this.imagePath = this.post?.imagePath;
        });
      },
      error: (err) => console.log(err.message),
    });
  }

  onUpdatePost() {
    this.postService.updatePost(
      this.postId,
      this.title,
      this.content,
      this.imagePath
    );
    this.router.navigate(['/post/post-list']);
  }

  onDeletePost = () => {
    this.postService.deletePost(this.postId);
    this.router.navigate(['/post/post-list']);
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
