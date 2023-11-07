import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit{
  @Input('id') id = '';
  @Input('title') title = '';
  @Input('description') description = '';
  @Input('priority') priority = '';
  @Input('status') status = '';
  @Input('departmentcode') departmentcode = '';
  @Output() delete = new EventEmitter()

  constructor(){}

  ngOnInit(): void {}

  onClick(){
    this.delete.emit();
  }

}
