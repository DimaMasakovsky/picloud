import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.router.events.subscribe(() => {
      this.searchForm.reset();
    });
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]],
    });
    const searchChanges = this.searchForm.valueChanges;
    searchChanges
      .pipe(
        map((value) => value.search),
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((val: string) => {
        this.storage.search = val;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
