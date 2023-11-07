import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  // Base url
  private readonly BASE_URL = 'https://localhost:3000/api/posts';

  // Constructor
  constructor(private http: HttpClient, private auth: AuthService) { }

  // Gets all Posts
  getPosts(){
    const token = this.auth.token
    return this.http.get(this.BASE_URL, {
      headers: {
        'x-auth-token':token?? '',
      },
    });
  }


  // Adds a post, taking in all of its properties as paramters
  add(title: string, description: string,priority: string, status: string, departmentcode: string , author: string){
    const token = this.auth.token
    return this.http.post(
      this.BASE_URL,
      {
        title, description, priority, status, departmentcode, author
      },
      {
        headers: {
          'x-auth-token': token?? '',
        },
      }
    );
  }
  

  // Deletes a post
  delete(id: string){
    return this.http.delete(`${this.BASE_URL}/${id}`,{
      headers: {
        'x-auth-token': this.auth.token?? '',
      },
    });
  }
}
