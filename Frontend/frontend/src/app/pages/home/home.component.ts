import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { DatePipe } from '@angular/common';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //title, description, priority, status, departmentcode

  posts: any[] = [];
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [Validators.required, Validators.minLength(3)]);
  priority = new FormControl('high', [Validators.required]);
  status = new FormControl('open', [Validators.required]);
  departmentcode = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,5}$/)]);
  hasError = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private postsService: PostsService,
    private datePipe: DatePipe,
    private titleService: Title,
    private renderer: Renderer2, private el: ElementRef
  ) {
    this.titleService.setTitle("Home");
  }

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
      .add(this.title.value, this.description.value, this.priority.value, this.status.value, this.departmentcode.value)
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
  
  

  deletePost(id: string): void {
    console.log('I was called!');
    this.postsService
      .delete(id)
      .subscribe({
        next: (v) => {
          console.log(v);
          // After successful deletion, update the local posts array
          const filtered = this.posts.filter((post) => post._id !== id);
          this.posts = filtered;
        },
        error: (e) => console.log(e),
      });
  }

  confirmDelete(postId: string): void {
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (confirmed) {
      this.deletePost(postId);
    }
  }

  formatDate(createdAt: string): string {
    // Parse the input date into a JavaScript Date object
    const parsedDate = new Date(createdAt);

    // Define the desired date format
    const dateFormat = 'd MMM y HH:mm';

    // Use the DatePipe to format the date
    const formattedDate = this.datePipe.transform(parsedDate, dateFormat);

    return formattedDate || '';
  }

}
