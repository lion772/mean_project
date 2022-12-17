import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  errorMsg = '';
  form!: FormGroup;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.postService.addPost(this.form.value.title, this.form.value.content);
    this.form.reset();
    this.router.navigate(['/post/post-list']);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files; //file object
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    console.log(file);
    console.log(this.form);
  }
}
