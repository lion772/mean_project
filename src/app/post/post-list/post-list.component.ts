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
  private subscription!: Subscription;
  postId!: string;
  postList: PostModel[] = [];
  postFound: any;
  title!: string;
  content!: string;

  constructor(private postService: PostService, private router: Router) {}

  /* async ngOnInit() {
    this.postList = this.postService.mapPost(
      await this.postService.getPostsPromise()
    );
    console.log(this.postList);
  }
 */
  ngOnInit() {
    this.postService.getPosts();

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

 /*  async retrieveListPosts(): Promise<any> {
    const success = await this.postService.getPostsPromise();
    if (!success) {
      console.log('an error has occurred ');
      this.router.navigate(['**']);
      return;
    }

    this.router.navigate(['/post/post-list']);
  } */

  onClick(id: string) {
    this.postId = id;
    this.postFound = this.postService.getPost(this.postId);
    this.title = this.postFound['title'];
    this.content = this.postFound['content'];
    console.log(id, this.title, this.content);
    this.router.navigate([
      `/post/post-detail/${this.postId}/${this.title}/${this.content}`,
    ]);
  }

  saveInLocalStorage(): void {
    localStorage.setItem('title', this.title);
    localStorage.setItem('content', this.content);
  }
}
