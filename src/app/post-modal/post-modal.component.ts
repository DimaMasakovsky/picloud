import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
})
export class PostModalComponent implements OnInit {
  public post: Post;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { postID: string },
    private crudService: CrudService,
  ) {}

  ngOnInit(): void {
    this.crudService.handleObjectByRef('posts', this.data.postID).subscribe((value) => {
      this.post = value;
    });
  }

  public getBackgroundImage(): string {
    return `url(${this.post?.contentPicURL})`;
  }
}
