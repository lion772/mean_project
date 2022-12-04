import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { PostModel } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postlist: PostModel[] = [];
  private postlistUpdated = new BehaviorSubject<PostModel[] | null>(null);
  postlistUpdated$ = this.postlistUpdated.asObservable();
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<{ message: string; posts: PostModel[] }>(
        'http://localhost:3000/list'
      )
      .pipe(
        map((data) => {
          this.postlistUpdated.next(data.posts);
          return data.posts.map((postData: any) => {
            const pipedPosts = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
            };
            return pipedPosts;
          });
        })
      );
  }

  setCurrentPosts(posts: any) {
    this.postlistUpdated.next(posts);
  }

  mapPost(posts: any[]) {
    return posts.map((post) => {
      return { id: post._id, title: post.title, content: post.content };
    });
  }

  getPost(id: string) {
    return { ...this.postlist.find((p) => p.id === id) };
  }

  updatePost(id: string, title: string, content: string) {
    const postToUpdate = { _id: id, title: title, content: content };
    console.log(postToUpdate);
    this.http
      .put<{ message: string }>(
        `http://localhost:3000/update/${id}`,
        postToUpdate
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  async addPost(title: string, content: string): Promise<any> {
    const postCreated = { id: null, title: title, content: content };
    return this.http
      .post<{ message: string; post: any }>(
        'http://localhost:3000/insert',
        postCreated
      )
      .subscribe((data) => {
        if (!data) {
          console.log('Something went wrong!');
        }
        console.log(data);
        return data;
      });
  }

  deletePost(id: string) {
    //const postToDelete = { _id: id, title: title, content: content };
    this.http
      .delete<{ message: string; isDeleted: boolean }>(
        `http://localhost:3000/delete/${id}`
      )
      .pipe(
        map((res) => {
          return res.isDeleted;
        })
      )
      .subscribe((data) => {
        console.log('deleted!', data);
        return data;
      });
  }
}
