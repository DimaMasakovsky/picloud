import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() tag: string;

  constructor(private router: Router, private storage: StorageService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  public searchByTag(): void {
    this.router.navigate(['/search']);
    this.dialog.closeAll();
    this.storage.search = this.tag;
  }
}
