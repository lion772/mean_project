import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  errorMsg = '';
  form!: FormGroup;
  imagePreview!: string;

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
        asyncValidators: [mimeType],
      }),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.postService.addPost(
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
    );
    this.form.reset();
    this.router.navigate(['/post/post-list']);
  }

  onImagePicked(event: Event) {
    const fileList = (event.target as HTMLInputElement).files; //file object list
    const file = fileList && fileList[0]; //file object
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file as Blob);

    console.log(this.form);
  }
}
