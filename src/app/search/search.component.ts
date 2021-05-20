import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder, private storage: StorageService) {}

  ngOnInit(): void {
    this.initForm();
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
}
