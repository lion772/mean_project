import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postlist: string[] = ['TEST'];
  constructor() {}

  getPosts(): Observable<string[]> {
    const posts = of(this.postlist);
    return posts;
  }

  setPost(post: string) {
    this.postlist.push(post);
    console.log(this.postlist);
  }
  clear() {
    this.postlist = [];
  }
}
