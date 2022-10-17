import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postlist: PostModel[] = [];
  private postlistUpdated = new Subject<PostModel[]>();
  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/')
      .pipe(
        map((postRetrieved) => {
          console.log('pipe', postRetrieved);
          return postRetrieved.posts.map((postData: any) => {
            console.log(postData);
            return {
              id: postData._id,
              title: postData.title,
              content: postData.content,
            };
          });
        })
      )
      .subscribe((pipedData) => {
        console.log('poster filtered', pipedData);
        this.postlist = pipedData;
        this.postlistUpdated.next([...this.postlist]);
      });

    return this.postlist;
  }

  getPostUpdatedListener() {
    return this.postlistUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const postCreated = { id: null, title: title, content: content };

    this.http
      .post<{ message: string; post: any }>(
        'http://localhost:3000/post',
        postCreated
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
  clear() {
    this.postlist = [];
  }
}
