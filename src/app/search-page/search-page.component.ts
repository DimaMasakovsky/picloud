import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CrudService } from '../services/crud.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public postsSubscription: Observable<any>;

  public usersSubscription: Observable<any>;

  private subscriptions: Array<Subscription> = [];

  public filter: string;

  constructor(
    private crudService: CrudService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    public storage: StorageService,
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts', {
      fieldPath: 'createTime',
      direction: 'desc',
    });
    this.usersSubscription = this.crudService.handleData('users', {
      fieldPath: 'displayName',
      direction: 'desc',
    });
    this.subscriptions.push(
      this.storage.searchValue$.subscribe((val) => {
        this.updateSearchResults(val);
      }),
    );
  }

  public updateSearchResults(inputValue: string): void {
    this.filter = inputValue;
    this.cdr.detectChanges();
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
