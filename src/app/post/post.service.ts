import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { PostModel } from './post.model';

const BASE_URL_ENDPOINT = 'http://localhost:3000/api/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postlist: PostModel[] = [];
  private postlistUpdated = new BehaviorSubject<PostModel[] | null>(null);
  postlistUpdated$ = this.postlistUpdated.asObservable();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.isLoading.next(true);

    this.http
      .get<{ message: string; posts: PostModel[] }>(BASE_URL_ENDPOINT)
      .pipe(
        map((data) => {
          return data.posts.map((postData: any) => {
            return {
              id: postData._id,
              title: postData.title,
              content: postData.content,
            };
          });
        })
      )
      .subscribe({
        next: (pipedData: PostModel[]) => {
          this.isLoading.next(false);
          this.postlist = pipedData;
          this.postlistUpdated.next([...this.postlist]);
        },
        error: (err) => console.log(err.message),
      });
  }

  setCurrentPosts(posts: any) {
    this.postlistUpdated.next(posts);
  }

  getPost(id: string) {
    return this.postlist.find((p) => p.id === id);
  }

  updatePost(id: string, title: string, content: string) {
    const postToUpdate = { _id: id, title: title, content: content };
    //todo: DELETE posts:PostModel[] from put method type
    this.http
      .put<{ message: string }>(`${BASE_URL_ENDPOINT}/${id}`, postToUpdate)
      .subscribe({
        next: (res) => {
          console.log('Update request made: ', res);

          const updatedPosts = [...this.postlist]; //clone original posts list
          const oldPostIndex = updatedPosts.findIndex((p) => p.id === id); //grab the to be updated post index
          updatedPosts[oldPostIndex] = { id, title, content }; //replace the properties with the new ones
          this.postlist = updatedPosts; //replace the whole list with the updated one
          this.postlistUpdated.next([...this.postlist]);
        },
        error: (err) => console.log(err.message),
      });
  }

  addPost(title: string, content: string) {
    const postCreated = { id: null, title: title, content: content };
    //
    this.isLoading.next(true);
    this.http
      .post<{ message: string; post: any }>(BASE_URL_ENDPOINT, postCreated)
      .subscribe({
        next: (data) => {
          this.isLoading.next(false);
          console.log(data);
          this.postlist = [...this.postlist, data.post];
          this.postlistUpdated.next([...this.postlist]);
        },
        error: (err) => {
          throw new Error(err.message);
        },
      });
  }

  deletePost(id: string) {
    this.http
      .delete<{ message: string; isDeleted: boolean }>(
        `${BASE_URL_ENDPOINT}/${id}`
      )
      .subscribe((_) => {
        console.log('deleted!');
        const updatedPosts = this.postlist.filter((post) => post.id !== id);
        this.postlistUpdated.next([...updatedPosts]);
      });
  }
}
