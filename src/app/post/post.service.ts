import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
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
  }

  async getPostsPromise(): Promise<PostModel[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/list')
        .then((response) => response.json())
        .then((rows) => {
          console.log(rows);
          this.postlist = this.mapPost(rows);
          resolve(rows);
        })
        .catch((error) => reject(error));
    });
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

  getPostUpdatedListener() {
    return this.postlistUpdated.asObservable();
  }

  async addPost(title: string, content: string): Promise<any> {
    const postCreated = { id: null, title: title, content: content };
    return new Promise<any>((resolve, reject) => {
      return this.http
        .post<{ message: string; post: any }>(
          'http://localhost:3000/insert',
          postCreated
        )
        .subscribe((data) => {
          if (!data) {
            reject('Something went wrong!');
          }
          console.log(data);
          resolve(data);
        });
    });
  }

  /*async addPostPromise(title: string, content: string): Promise<any> {
    let fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    console.log(fd);

    return new Promise<any>((resolve, reject) => {
      fetch('http://localhost:3000/post-create', {
        method: 'POST',
        body: fd,
      })
        .then((res) => res.json())
        .then(({ rows }) => {
          console.log(rows);
          resolve(rows);
        })
        .catch((err) => reject(err));
    });
  }*/

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
