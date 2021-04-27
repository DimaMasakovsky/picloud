import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

import { StorageService } from './services/storage.service';
import { CrudService } from './services/crud.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Picloud';

  private subscriptions: Array<Subscription> = [];

  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    private storage: StorageService,
    private crudService: CrudService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.handleData('posts').subscribe((data) => {
        this.storage.posts = data;
      }),
    );
    // eslint-disable-next-line no-console
    console.table({
      '23.04': this.ProjectUpdateData(
        'Add console table',
        'https://github.com/DimaMasakovsky/picloud/commit/0a2f9245acc45b834920cb9921f17b115fe02c72',
      ),
      '25.04': this.ProjectUpdateData(
        'Add post like feature',
        'https://github.com/DimaMasakovsky/picloud/commit/0343c75f6d5c66a72fea955bc1472b4d19523bb2',
      ),
      '27.04': this.ProjectUpdateData(
        'Add comments, profile bio, profile pic uploading',
        'https://github.com/DimaMasakovsky/picloud/commit/cd7187d9870451735322c8f2df9b3c6143e8cd83',
      ),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ProjectUpdateData(description: string, commitLink: string) {
    return { description, commitLink };
  }
}
