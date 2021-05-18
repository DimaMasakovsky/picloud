import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchInputEvent = new EventEmitter<string>();

  public searchForm: FormGroup;

  constructor(private fb: FormBuilder) {}

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
      .subscribe((val) => this.searchInputEvent.emit(val));
  }
}
