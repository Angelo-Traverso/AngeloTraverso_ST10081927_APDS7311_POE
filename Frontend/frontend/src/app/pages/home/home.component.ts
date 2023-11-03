import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //title, description, priority, status, departmentcode
  posts: any[] = [];
  title = new FormControl('');
  description = new FormControl('');
  priority = new FormControl('');
  status = new FormControl('');
  departmentcode = new FormControl('');
  hasError = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private postsService: PostsService
  ) { }

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
    console.log(this.title.value)
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
        next: (v) => {
          this.posts.push(v);
          this.title.setValue('');
          this.description.setValue('');
          this.priority.setValue('');
          this.status.setValue('');
          this.departmentcode.setValue('');
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

}
