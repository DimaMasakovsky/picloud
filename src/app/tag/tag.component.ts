import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() tag: string;

  constructor(private router: Router, private storage: StorageService) {}

  ngOnInit(): void {}

  public searchByTag(): void {
    this.router.navigate(['/search']);
    this.storage.search = this.tag;
  }
}
