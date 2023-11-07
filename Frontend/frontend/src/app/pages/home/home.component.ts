import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Holds posts from DB
  posts: any[] = [];

  // Validation for FormControl Elements
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [Validators.required, Validators.minLength(3)]);
  priority = new FormControl('high', [Validators.required]);
  status = new FormControl('open', [Validators.required]);
  departmentcode = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,5}$/)]);

  // Holds whether an error has been returned
  hasError = false;

  // Holds error message
  errorMessage = '';

  // Constructor
  constructor(
    private router: Router,
    private auth: AuthService,
    private postsService: PostsService,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Home");
  }


  // On Initialized
  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['./login'])
      return;
    }

    this.postsService.getPosts().subscribe({
      next: (v) => (this.posts = v as any),
      error: (e) => console.log(e),
    });
  }


  // Adding a new post
  addNewPost(e: Event) {
    e.preventDefault();
    this.hasError = false;

    if (
      !this.title.value ||
      !this.description.value ||
      !this.priority.value ||
      !this.status.value ||
      !this.departmentcode.value
    ) {
      this.hasError = true;
      this.errorMessage = 'Please ensure all fields are filled out';
      return;
    }

    this.postsService
      .add(this.title.value, this.description.value, this.priority.value, this.status.value, this.departmentcode.value, this.auth.getUsernameFromSessionStorage() || '')
      .subscribe({
        next: (newPost) => {

          // Successfully added the new post
          this.posts.push(newPost);

          // Reset form fields
          this.title.reset('');
          this.description.reset('');
          this.priority.reset('high');
          this.status.reset('open');
          this.departmentcode.reset('');

          // Set focus on the new post (the last post in the list)
          const postList = document.querySelector('.post-list');
          if (postList) {
            const newPostElement = postList.lastElementChild;
            if (newPostElement) {
              
              // Find a focusable child within the new post
              const focusableChild = newPostElement.querySelector('input, button, a');
              if (focusableChild) {
                (focusableChild as HTMLInputElement).focus();
              }
            }
          }
        },
        error: (e) => {
          this.hasError = true;
          this.errorMessage = e.error;
          console.log(e);
        },
      });
  }
}
