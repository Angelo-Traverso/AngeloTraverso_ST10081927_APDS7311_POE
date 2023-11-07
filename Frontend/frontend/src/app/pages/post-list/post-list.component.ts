import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  @Input() posts: any[] = [];
  @Input() title = '';
  @Input() description = '';
  @Input() priority = '';
  @Input() status = '';
  @Input() departmentcode = ''; // Add this line
  @Input() id = ''; // Add the input for post's ID
  @Output() delete = new EventEmitter<string>(); // Emit the post's ID as a string

  constructor(private postsService: PostsService, private datePipe: DatePipe) {}

  deletePost(id: string): void {
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (confirmed) {
      this.postsService
        .delete(id)
        .subscribe({
          next: (v) => {
            // After successful deletion, update the local posts array
            this.posts = this.posts.filter((post) => post._id !== id);
          },
          error: (e) => console.log(e),
        });
    }
  }

  isCurrentUserAuthor(post: any): boolean {
    const currentUser = sessionStorage.getItem('username');
    return post.author === currentUser;
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
